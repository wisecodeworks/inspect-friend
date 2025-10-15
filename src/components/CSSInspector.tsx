import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Copy, Check, Star } from "lucide-react";
import { toast } from "sonner";

interface SelectorOption {
  type: string;
  selector: string;
  priority: number;
  isUnique: boolean;
  description: string;
}

interface ElementInfo {
  tagName: string;
  id: string;
  classes: string[];
  dataAttributes: Record<string, string>;
  selectors: SelectorOption[];
  xpath: string;
  position: { x: number; y: number; width: number; height: number };
}

interface CSSInspectorProps {
  isActive?: boolean;
  onToggle?: (active: boolean) => void;
  showToggleButton?: boolean;
}

export const CSSInspector = ({ 
  isActive: controlledIsActive, 
  onToggle, 
  showToggleButton = true 
}: CSSInspectorProps = {}) => {
  const [internalIsActive, setInternalIsActive] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [elementInfo, setElementInfo] = useState<ElementInfo | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Use controlled state if provided, otherwise use internal state
  const isActive = controlledIsActive !== undefined ? controlledIsActive : internalIsActive;
  
  const toggleActive = () => {
    const newState = !isActive;
    if (onToggle) {
      onToggle(newState);
    } else {
      setInternalIsActive(newState);
    }
  };

  const isUnique = (selector: string): boolean => {
    try {
      return document.querySelectorAll(selector).length === 1;
    } catch {
      return false;
    }
  };

  const generateXPath = (element: HTMLElement): string => {
    if (element.id) {
      return `//*[@id="${element.id}"]`;
    }
    
    const parts: string[] = [];
    let current: HTMLElement | null = element;
    
    while (current && current.nodeType === Node.ELEMENT_NODE) {
      let index = 0;
      let sibling: Element | null = current;
      
      while (sibling) {
        if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === current.tagName) {
          index++;
        }
        sibling = sibling.previousElementSibling;
      }
      
      const tagName = current.tagName.toLowerCase();
      const pathIndex = index > 1 ? `[${index}]` : '';
      parts.unshift(`${tagName}${pathIndex}`);
      
      current = current.parentElement;
    }
    
    return `/${parts.join('/')}`;
  };

  const generateSelectors = (element: HTMLElement): SelectorOption[] => {
    const selectors: SelectorOption[] = [];
    
    // ID selector - PRIORITY 1 (Best for GTM)
    if (element.id) {
      const selector = `#${element.id}`;
      selectors.push({
        type: 'ID',
        selector,
        priority: 1,
        isUnique: isUnique(selector),
        description: 'Best for GTM - unique and stable'
      });
    }
    
    // Class selectors - PRIORITY 2
    const classes = Array.from(element.classList).filter(cls => cls);
    if (classes.length > 0) {
      // Single most specific class
      if (classes.length === 1) {
        const selector = `.${classes[0]}`;
        selectors.push({
          type: 'Class',
          selector,
          priority: 2,
          isUnique: isUnique(selector),
          description: 'GTM standard - works well for click triggers'
        });
      }
      
      // All classes combined
      const combinedSelector = `${element.tagName.toLowerCase()}.${classes.join('.')}`;
      selectors.push({
        type: 'Combined Classes',
        selector: combinedSelector,
        priority: 2,
        isUnique: isUnique(combinedSelector),
        description: 'More specific - reduces false matches'
      });
    }
    
    // Data attribute selectors - PRIORITY 3
    Object.keys(element.dataset).forEach(key => {
      const value = element.dataset[key];
      const selector = `[data-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}="${value}"]`;
      selectors.push({
        type: 'Data Attribute',
        selector,
        priority: 3,
        isUnique: isUnique(selector),
        description: 'Semantic alternative - requires setup'
      });
    });
    
    // Tag with data attributes - PRIORITY 3
    const dataAttrs = Object.keys(element.dataset);
    if (dataAttrs.length > 0) {
      const firstDataKey = dataAttrs[0];
      const value = element.dataset[firstDataKey];
      const selector = `${element.tagName.toLowerCase()}[data-${firstDataKey.replace(/([A-Z])/g, '-$1').toLowerCase()}="${value}"]`;
      selectors.push({
        type: 'Tag + Data',
        selector,
        priority: 3,
        isUnique: isUnique(selector),
        description: 'Tag with data attribute'
      });
    }
    
    // Path-based selector - PRIORITY 4 (Fallback)
    let path = element.tagName.toLowerCase();
    let currentElement = element;
    
    while (currentElement.parentElement && currentElement.parentElement !== document.body) {
      const parent = currentElement.parentElement;
      const index = Array.from(parent.children).indexOf(currentElement) + 1;
      path = `${parent.tagName.toLowerCase()} > :nth-child(${index})${path ? ' > ' + path : ''}`;
      currentElement = parent;
      if (currentElement.id) {
        path = `#${currentElement.id} > ${path}`;
        break;
      }
    }
    
    selectors.push({
      type: 'Path',
      selector: path,
      priority: 4,
      isUnique: isUnique(path),
      description: 'Avoid if possible - breaks when layout changes'
    });
    
    return selectors.sort((a, b) => a.priority - b.priority);
  };

  const handleClick = useCallback((e: MouseEvent) => {
    if (!isActive) return;

    const target = e.target as HTMLElement;
    
    // Ignore inspector UI elements
    if (target.closest('[data-inspector-ui]')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    
    setIsLocked(true);
    setHoveredElement(target);

    const rect = target.getBoundingClientRect();
    const dataAttributes: Record<string, string> = {};
    
    Array.from(target.attributes).forEach(attr => {
      if (attr.name.startsWith('data-')) {
        dataAttributes[attr.name] = attr.value;
      }
    });

    setElementInfo({
      tagName: target.tagName.toLowerCase(),
      id: target.id || '',
      classes: Array.from(target.classList),
      dataAttributes,
      selectors: generateSelectors(target),
      xpath: generateXPath(target),
      position: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }
    });
  }, [isActive]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isActive || isLocked) return;

    const target = e.target as HTMLElement;
    
    // Ignore inspector UI elements
    if (target.closest('[data-inspector-ui]')) {
      setHoveredElement(null);
      setElementInfo(null);
      return;
    }

    setHoveredElement(target);

    const rect = target.getBoundingClientRect();
    const dataAttributes: Record<string, string> = {};
    
    Array.from(target.attributes).forEach(attr => {
      if (attr.name.startsWith('data-')) {
        dataAttributes[attr.name] = attr.value;
      }
    });

    setElementInfo({
      tagName: target.tagName.toLowerCase(),
      id: target.id || '',
      classes: Array.from(target.classList),
      dataAttributes,
      selectors: generateSelectors(target),
      xpath: generateXPath(target),
      position: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }
    });
  }, [isActive, isLocked]);

  const handleCopy = async (text: string, label: string) => {
    try {
      // Modern Clipboard API (preferred)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopiedItem(label);
        toast.success(`Copied ${label} to clipboard`);
        setTimeout(() => setCopiedItem(null), 2000);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopiedItem(label);
          toast.success(`Copied ${label} to clipboard`);
          setTimeout(() => setCopiedItem(null), 2000);
        } else {
          throw new Error('Copy command failed');
        }
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error(`Failed to copy ${label}. Please try again.`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLocked) {
          // First escape: unlock
          setIsLocked(false);
          setHoveredElement(null);
          setElementInfo(null);
        } else if (isActive) {
          // Second escape: deactivate inspector
          toggleActive();
        }
      }
    };

    if (isActive) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('click', handleClick, true);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      setElementInfo(null);
      setHoveredElement(null);
      setIsLocked(false);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, isLocked, handleMouseMove, handleClick]);

  return (
    <>
      {/* Toggle Button */}
      {showToggleButton && (
        <div className="fixed top-4 right-4 z-50" data-inspector-ui>
          <Button
            onClick={toggleActive}
            variant={isActive ? "default" : "secondary"}
            size="lg"
            className="shadow-lg"
          >
            {isActive ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Disable Inspector
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Enable Inspector
              </>
            )}
          </Button>
        </div>
      )}

      {/* Highlight Overlay */}
      {isActive && hoveredElement && elementInfo && (
        <div
          className={`fixed pointer-events-none z-40 border-2 transition-all duration-100 ${
            isLocked ? 'border-green-500' : 'border-primary'
          }`}
          style={{
            left: `${elementInfo.position.x}px`,
            top: `${elementInfo.position.y}px`,
            width: `${elementInfo.position.width}px`,
            height: `${elementInfo.position.height}px`,
            boxShadow: isLocked 
              ? `0 0 0 2000px rgba(0, 0, 0, 0.3), 0 0 20px rgb(34, 197, 94)`
              : `0 0 0 2000px rgba(0, 0, 0, 0.3), 0 0 20px hsl(var(--primary))`,
          }}
        />
      )}

      {/* Info Panel - Fixed Position */}
      {isActive && elementInfo && (
        <Card 
          className="fixed bottom-4 left-4 z-50 p-4 w-96 shadow-2xl border-primary/50 animate-fade-in"
          data-inspector-ui
          style={{
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto'
          }}
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div>
                <h3 className="font-semibold text-sm">Element Inspector</h3>
                <p className="text-xs text-muted-foreground">
                  {isLocked ? (
                    <>Click another element or press <kbd className="px-1 py-0.5 bg-muted rounded text-xs font-mono">ESC</kbd> to unlock</>
                  ) : (
                    'Hover to preview, click to lock'
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isLocked && (
                  <Badge variant="default" className="text-xs bg-green-600">
                    Locked
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  &lt;{elementInfo.tagName}&gt;
                </Badge>
              </div>
            </div>

            {/* Best for GTM Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold">
                  {elementInfo.selectors[0]?.isUnique ? (
                    <span className="text-green-600">✓ Best Selector for GTM</span>
                  ) : (
                    <span className="text-orange-600">⚠ Best Available Selector</span>
                  )}
                </span>
              </div>
              {elementInfo.selectors.length > 0 ? (
                <div className="bg-code-bg p-3 rounded border-2 border-primary/30">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <Badge variant="outline" className="text-xs mb-2">
                        {elementInfo.selectors[0].type}
                      </Badge>
                      <code className="text-sm font-mono text-primary block break-all bg-background p-2 rounded">
                        {elementInfo.selectors[0].selector}
                      </code>
                      <p className="text-xs text-muted-foreground mt-2">
                        {elementInfo.selectors[0].description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {elementInfo.selectors[0].isUnique ? (
                          <Badge variant="default" className="text-xs bg-green-600">
                            ✓ Unique
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                            Multiple matches
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(elementInfo.selectors[0].selector, 'best selector')}
                      className="h-8 px-2"
                    >
                      {copiedItem === 'best selector' ? (
                        <Check className="h-4 w-4 text-accent" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No selector available</p>
              )}
              
              {/* Warning for elements without ID/classes */}
              {!elementInfo.id && elementInfo.classes.length === 0 && (
                <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-800">
                  ⚠ Warning: No ID or classes found. Consider adding semantic identifiers for better GTM tracking.
                </div>
              )}
            </div>

            {/* All Selector Options */}
            {elementInfo.selectors.length > 1 && (
              <div>
                <div className="text-sm font-semibold mb-2">All Selector Options</div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {elementInfo.selectors.slice(1).map((option, idx) => (
                    <div key={idx} className="bg-code-bg p-2 rounded text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {option.type}
                            </Badge>
                            {option.isUnique && (
                              <span className="text-green-600 text-xs">✓</span>
                            )}
                          </div>
                          <code className="text-foreground block break-all">
                            {option.selector}
                          </code>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(option.selector, `selector-${idx}`)}
                          className="h-6 px-2"
                        >
                          {copiedItem === `selector-${idx}` ? (
                            <Check className="h-3 w-3 text-accent" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* XPath */}
            <div>
              <div className="text-sm font-semibold mb-2">XPath</div>
              <div className="bg-code-bg p-2 rounded">
                <div className="flex items-start justify-between gap-2">
                  <code className="text-xs text-foreground flex-1 break-all">
                    {elementInfo.xpath}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(elementInfo.xpath, 'xpath')}
                    className="h-6 px-2"
                  >
                    {copiedItem === 'xpath' ? (
                      <Check className="h-3 w-3 text-accent" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Data Attributes */}
            {Object.keys(elementInfo.dataAttributes).length > 0 && (
              <div>
                <div className="text-sm font-semibold mb-2">Data Attributes</div>
                <div className="bg-code-bg p-2 rounded space-y-1 max-h-32 overflow-y-auto">
                  {Object.entries(elementInfo.dataAttributes).map(([key, value], idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2">
                      <code className="text-xs text-foreground flex-1 break-all">
                        <span className="text-accent">{key}</span>="{value}"
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(`[${key}="${value}"]`, key)}
                        className="h-6 px-2"
                      >
                        {copiedItem === key ? (
                          <Check className="h-3 w-3 text-accent" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Element Details */}
            <details className="text-xs">
              <summary className="cursor-pointer font-semibold text-sm mb-2">Element Details</summary>
              <div className="space-y-2 mt-2">
                {/* ID */}
                {elementInfo.id && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">ID</div>
                    <div className="flex items-center justify-between gap-2 bg-code-bg p-2 rounded">
                      <code className="text-xs text-primary">#{elementInfo.id}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(`#${elementInfo.id}`, 'ID')}
                        className="h-6 px-2"
                      >
                        {copiedItem === 'ID' ? (
                          <Check className="h-3 w-3 text-accent" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Classes */}
                {elementInfo.classes.length > 0 && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Classes ({elementInfo.classes.length})</div>
                    <div className="bg-code-bg p-2 rounded space-y-1 max-h-24 overflow-y-auto">
                      {elementInfo.classes.map((cls, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2">
                          <code className="text-xs text-foreground">.{cls}</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopy(`.${cls}`, `class ${cls}`)}
                            className="h-6 px-2"
                          >
                            {copiedItem === `class ${cls}` ? (
                              <Check className="h-3 w-3 text-accent" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </details>
          </div>
        </Card>
      )}
    </>
  );
};
