// GTM Inspector Bookmarklet - Styled Version
// This version includes all styling from the React app for a polished look

(function() {
  'use strict';

  // Inject styles that match the design system
  const styleId = 'gtm-inspector-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* GTM Inspector Styles - Design System Colors (HSL) */
      :root {
        --gtm-background: 220 26% 14%;
        --gtm-foreground: 210 40% 98%;
        --gtm-card: 220 20% 18%;
        --gtm-card-foreground: 210 40% 98%;
        --gtm-primary: 263 70% 60%;
        --gtm-primary-foreground: 210 40% 98%;
        --gtm-secondary: 220 17% 24%;
        --gtm-secondary-foreground: 210 40% 98%;
        --gtm-muted: 220 17% 24%;
        --gtm-muted-foreground: 215 20.2% 65.1%;
        --gtm-accent: 192 91% 55%;
        --gtm-accent-foreground: 220 26% 14%;
        --gtm-border: 220 17% 24%;
        --gtm-code-bg: 220 20% 12%;
        --gtm-radius: 0.75rem;
        --gtm-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Base Inspector Styles */
      .gtm-inspector-overlay {
        position: fixed;
        pointer-events: none;
        border: 2px solid hsl(var(--gtm-primary));
        box-shadow: 0 0 30px hsla(263, 70%, 60%, 0.3);
        z-index: 999999;
        transition: var(--gtm-transition);
        background: hsla(263, 70%, 60%, 0.1);
      }

      .gtm-inspector-overlay.locked {
        border-color: hsl(120, 100%, 40%);
        box-shadow: 0 0 30px hsla(120, 100%, 40%, 0.3);
      }

      .gtm-inspector-toggle {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 1000000;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        white-space: nowrap;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        height: 2.75rem;
        padding: 0.5rem 2rem;
        background: hsl(var(--gtm-primary));
        color: hsl(var(--gtm-primary-foreground));
        border: none;
        cursor: pointer;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        transition: var(--gtm-transition);
      }

      .gtm-inspector-toggle:hover {
        background: hsl(263 70% 50%);
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        transform: translateY(-2px);
      }

      .gtm-inspector-toggle:active {
        transform: translateY(0);
      }

      .gtm-inspector-toggle.active {
        background: hsl(120, 100%, 40%);
      }

      .gtm-inspector-panel {
        position: fixed;
        bottom: 90px;
        left: 20px;
        width: 500px;
        max-height: 70vh;
        overflow-y: auto;
        z-index: 1000001;
        border-radius: var(--gtm-radius);
        border: 1px solid hsl(var(--gtm-border));
        background: hsl(var(--gtm-card));
        color: hsl(var(--gtm-card-foreground));
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        animation: gtm-fade-in 0.3s ease-out;
      }

      @keyframes gtm-fade-in {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .gtm-card-header {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        padding: 1.5rem;
        border-bottom: 1px solid hsl(var(--gtm-border));
      }

      .gtm-card-title {
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.2;
        letter-spacing: -0.025em;
      }

      .gtm-card-description {
        font-size: 0.875rem;
        color: hsl(var(--gtm-muted-foreground));
      }

      .gtm-card-content {
        padding: 1.5rem;
        padding-top: 0;
      }

      .gtm-section {
        margin-top: 1.5rem;
      }

      .gtm-section-title {
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: hsl(var(--gtm-foreground));
      }

      .gtm-badge {
        display: inline-flex;
        align-items: center;
        border-radius: 9999px;
        border: 1px solid transparent;
        padding: 0.125rem 0.625rem;
        font-size: 0.75rem;
        font-weight: 600;
        transition: var(--gtm-transition);
      }

      .gtm-badge-primary {
        border-color: transparent;
        background: hsl(var(--gtm-primary));
        color: hsl(var(--gtm-primary-foreground));
      }

      .gtm-badge-success {
        border-color: transparent;
        background: hsl(120, 100%, 40%);
        color: hsl(var(--gtm-primary-foreground));
      }

      .gtm-badge-warning {
        border-color: transparent;
        background: hsl(30, 100%, 50%);
        color: hsl(var(--gtm-primary-foreground));
      }

      .gtm-badge-secondary {
        border-color: transparent;
        background: hsl(var(--gtm-secondary));
        color: hsl(var(--gtm-secondary-foreground));
      }

      .gtm-badge-outline {
        color: hsl(var(--gtm-foreground));
        border-color: hsl(var(--gtm-border));
      }

      .gtm-selector-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem;
        border-radius: calc(var(--gtm-radius) - 2px);
        border: 1px solid hsl(var(--gtm-border));
        margin-bottom: 0.5rem;
        background: hsl(var(--gtm-background));
        transition: var(--gtm-transition);
      }

      .gtm-selector-item:hover {
        background: hsl(var(--gtm-secondary));
      }

      .gtm-selector-info {
        flex: 1;
        margin-right: 0.5rem;
      }

      .gtm-selector-type {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        color: hsl(var(--gtm-muted-foreground));
        margin-bottom: 0.25rem;
      }

      .gtm-selector-value {
        font-family: "Monaco", "Courier New", monospace;
        font-size: 0.875rem;
        color: hsl(var(--gtm-primary));
        word-break: break-all;
        background: hsl(var(--gtm-code-bg));
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        margin: 0.25rem 0;
      }

      .gtm-selector-desc {
        font-size: 0.75rem;
        color: hsl(var(--gtm-muted-foreground));
        margin-top: 0.25rem;
      }

      .gtm-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        white-space: nowrap;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        padding: 0.5rem 0.75rem;
        border: none;
        cursor: pointer;
        transition: var(--gtm-transition);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }

      .gtm-btn-sm {
        height: 2.25rem;
        padding: 0.5rem 0.75rem;
      }

      .gtm-btn-ghost {
        background: transparent;
        color: hsl(var(--gtm-foreground));
      }

      .gtm-btn-ghost:hover {
        background: hsl(var(--gtm-secondary));
      }

      .gtm-btn-outline {
        border: 1px solid hsl(var(--gtm-border));
        background: hsl(var(--gtm-background));
        color: hsl(var(--gtm-foreground));
      }

      .gtm-btn-outline:hover {
        background: hsl(var(--gtm-accent));
        color: hsl(var(--gtm-accent-foreground));
      }

      .gtm-code-block {
        font-family: "Monaco", "Courier New", monospace;
        font-size: 0.875rem;
        background: hsl(var(--gtm-code-bg));
        color: hsl(var(--gtm-primary));
        padding: 0.75rem;
        border-radius: calc(var(--gtm-radius) - 2px);
        word-break: break-all;
        margin: 0.5rem 0;
        border: 1px solid hsl(var(--gtm-border));
      }

      .gtm-data-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
        border-bottom: 1px solid hsl(var(--gtm-border));
      }

      .gtm-data-item:last-child {
        border-bottom: none;
      }

      .gtm-data-key {
        font-weight: 600;
        font-size: 0.875rem;
        color: hsl(var(--gtm-muted-foreground));
      }

      .gtm-data-value {
        font-family: "Monaco", "Courier New", monospace;
        font-size: 0.875rem;
        color: hsl(var(--gtm-accent));
      }

      .gtm-icon {
        width: 1rem;
        height: 1rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .gtm-best-selector {
        background: linear-gradient(135deg, hsl(263 70% 60%), hsl(192 91% 55%));
        border: 2px solid hsl(var(--gtm-primary));
        padding: 1rem;
        border-radius: var(--gtm-radius);
        margin-bottom: 1.5rem;
      }

      .gtm-best-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: hsl(var(--gtm-primary-foreground));
      }

      .gtm-scrollable {
        max-height: 300px;
        overflow-y: auto;
        padding-right: 0.5rem;
      }

      .gtm-scrollable::-webkit-scrollbar {
        width: 8px;
      }

      .gtm-scrollable::-webkit-scrollbar-track {
        background: hsl(var(--gtm-background));
        border-radius: 4px;
      }

      .gtm-scrollable::-webkit-scrollbar-thumb {
        background: hsl(var(--gtm-primary));
        border-radius: 4px;
      }

      .gtm-scrollable::-webkit-scrollbar-thumb:hover {
        background: hsl(263 70% 50%);
      }
    `;
    document.head.appendChild(style);
  }

  // SVG Icons as strings
  const icons = {
    eye: '<svg class="gtm-icon" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg class="gtm-icon" viewBox="0 0 24 24"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>',
    copy: '<svg class="gtm-icon" viewBox="0 0 24 24"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
    check: '<svg class="gtm-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
    star: '<svg class="gtm-icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
  };

  let isActive = false;
  let isLocked = false;
  let currentElement = null;
  let overlay = null;
  let toggleButton = null;
  let panel = null;
  let copiedTimeout = null;

  // Helper: Check if selector is unique
  function isUnique(selector) {
    try {
      return document.querySelectorAll(selector).length === 1;
    } catch {
      return false;
    }
  }

  // Helper: Generate XPath
  function generateXPath(element) {
    if (element.id) {
      return `//*[@id="${element.id}"]`;
    }
    const parts = [];
    while (element && element.nodeType === Node.ELEMENT_NODE) {
      let index = 0;
      let sibling = element.previousSibling;
      while (sibling) {
        if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === element.nodeName) {
          index++;
        }
        sibling = sibling.previousSibling;
      }
      const tagName = element.nodeName.toLowerCase();
      const pathIndex = index > 0 ? `[${index + 1}]` : '';
      parts.unshift(tagName + pathIndex);
      element = element.parentNode;
    }
    return parts.length ? '/' + parts.join('/') : '';
  }

  // Helper: Generate selectors
  function generateSelectors(element) {
    const selectors = [];
    
    // ID selector
    if (element.id) {
      selectors.push({
        type: 'ID',
        value: `#${element.id}`,
        priority: 1,
        unique: isUnique(`#${element.id}`),
        description: 'Highest specificity, best for unique elements'
      });
    }

    // Data attribute selectors
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('data-')) {
        const selector = `[${attr.name}="${attr.value}"]`;
        selectors.push({
          type: 'Data Attribute',
          value: selector,
          priority: 2,
          unique: isUnique(selector),
          description: 'Recommended for GTM - semantic and stable'
        });
      }
    });

    // Class selectors
    if (element.classList.length > 0) {
      const classList = Array.from(element.classList);
      
      // Single class
      classList.forEach(cls => {
        const selector = `.${cls}`;
        selectors.push({
          type: 'Class',
          value: selector,
          priority: 3,
          unique: isUnique(selector),
          description: 'May match multiple elements'
        });
      });

      // Combined classes
      if (classList.length > 1) {
        const selector = '.' + classList.join('.');
        selectors.push({
          type: 'Combined Classes',
          value: selector,
          priority: 3,
          unique: isUnique(selector),
          description: 'More specific than single class'
        });
      }
    }

    // Tag name
    const tagSelector = element.tagName.toLowerCase();
    selectors.push({
      type: 'Tag',
      value: tagSelector,
      priority: 5,
      unique: isUnique(tagSelector),
      description: 'Least specific, matches all similar elements'
    });

    // nth-child
    const parent = element.parentElement;
    if (parent) {
      const index = Array.from(parent.children).indexOf(element) + 1;
      const selector = `${tagSelector}:nth-child(${index})`;
      selectors.push({
        type: 'nth-child',
        value: selector,
        priority: 4,
        unique: isUnique(selector),
        description: 'Position-based, may break if DOM changes'
      });
    }

    return selectors.sort((a, b) => a.priority - b.priority);
  }

  // Create toggle button
  function createToggleButton() {
    if (toggleButton) return;
    
    toggleButton = document.createElement('button');
    toggleButton.className = 'gtm-inspector-toggle';
    toggleButton.innerHTML = icons.eye + '<span>Activate Inspector</span>';
    toggleButton.onclick = toggleInspector;
    document.body.appendChild(toggleButton);
  }

  // Create overlay
  function createOverlay() {
    if (overlay) return;
    
    overlay = document.createElement('div');
    overlay.className = 'gtm-inspector-overlay';
    overlay.style.display = 'none';
    document.body.appendChild(overlay);
  }

  // Toggle inspector
  function toggleInspector() {
    isActive = !isActive;
    
    if (isActive) {
      toggleButton.classList.add('active');
      toggleButton.innerHTML = icons.eyeOff + '<span>Deactivate</span>';
      overlay.style.display = 'block';
    } else {
      toggleButton.classList.remove('active');
      toggleButton.innerHTML = icons.eye + '<span>Activate Inspector</span>';
      overlay.style.display = 'none';
      isLocked = false;
      if (panel) {
        panel.remove();
        panel = null;
      }
    }
  }

  // Handle mouse move
  function handleMouseMove(e) {
    if (!isActive || isLocked) return;
    
    const element = document.elementFromPoint(e.clientX, e.clientY);
    if (!element || element === overlay || element === toggleButton || 
        (panel && panel.contains(element))) return;
    
    currentElement = element;
    const rect = element.getBoundingClientRect();
    overlay.style.top = rect.top + window.scrollY + 'px';
    overlay.style.left = rect.left + window.scrollX + 'px';
    overlay.style.width = rect.width + 'px';
    overlay.style.height = rect.height + 'px';
  }

  // Handle click
  function handleClick(e) {
    if (!isActive || !currentElement) return;
    
    if (panel && panel.contains(e.target)) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    isLocked = true;
    overlay.classList.add('locked');
    showPanel(currentElement);
  }

  // Copy to clipboard
  async function copyToClipboard(text, label, button) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      const originalHTML = button.innerHTML;
      button.innerHTML = icons.check + `<span>Copied!</span>`;
      button.style.background = 'hsl(120, 100%, 40%)';
      
      if (copiedTimeout) clearTimeout(copiedTimeout);
      copiedTimeout = setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
      }, 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      alert('Failed to copy. Please try manually selecting the text.');
    }
  }

  // Show panel
  function showPanel(element) {
    if (panel) panel.remove();
    
    const selectors = generateSelectors(element);
    const bestSelector = selectors.find(s => s.unique) || selectors[0];
    const xpath = generateXPath(element);
    const dataAttrs = Array.from(element.attributes).filter(a => a.name.startsWith('data-'));
    
    panel = document.createElement('div');
    panel.className = 'gtm-inspector-panel';
    
    let html = `
      <div class="gtm-card-header">
        <h3 class="gtm-card-title">Element Inspector</h3>
        <p class="gtm-card-description">
          <span class="gtm-badge gtm-badge-success">Locked</span>
          Click outside or press ESC to unlock
        </p>
      </div>
      <div class="gtm-card-content">
        <!-- Best Selector -->
        <div class="gtm-best-selector">
          <div class="gtm-best-title">
            ${icons.star}
            <span>Best Selector for GTM</span>
          </div>
          <div class="gtm-selector-value">${bestSelector.value}</div>
          <div style="margin-top: 0.5rem;">
            <button class="gtm-btn gtm-btn-sm gtm-btn-outline" data-copy="${bestSelector.value}" data-label="Best Selector">
              ${icons.copy}
              <span>Copy</span>
            </button>
          </div>
        </div>

        <!-- All Selectors -->
        <div class="gtm-section">
          <h4 class="gtm-section-title">All Selector Options</h4>
          <div class="gtm-scrollable">
    `;
    
    selectors.forEach(sel => {
      const badgeClass = sel.unique ? 'gtm-badge-success' : 
                        sel.priority <= 2 ? 'gtm-badge-warning' : 'gtm-badge-secondary';
      const badgeText = sel.unique ? 'Unique' : `${document.querySelectorAll(sel.value).length} matches`;
      
      html += `
        <div class="gtm-selector-item">
          <div class="gtm-selector-info">
            <div class="gtm-selector-type">${sel.type}</div>
            <div class="gtm-selector-value">${sel.value}</div>
            <div class="gtm-selector-desc">${sel.description}</div>
            <div style="margin-top: 0.25rem;">
              <span class="gtm-badge ${badgeClass}">${badgeText}</span>
            </div>
          </div>
          <button class="gtm-btn gtm-btn-sm gtm-btn-ghost" data-copy="${sel.value}" data-label="${sel.type}">
            ${icons.copy}
          </button>
        </div>
      `;
    });
    
    html += `
          </div>
        </div>

        <!-- XPath -->
        <div class="gtm-section">
          <h4 class="gtm-section-title">XPath</h4>
          <div class="gtm-code-block">${xpath}</div>
          <button class="gtm-btn gtm-btn-sm gtm-btn-outline" data-copy="${xpath}" data-label="XPath">
            ${icons.copy}
            <span>Copy XPath</span>
          </button>
        </div>
    `;
    
    // Data attributes
    if (dataAttrs.length > 0) {
      html += `
        <div class="gtm-section">
          <h4 class="gtm-section-title">Data Attributes</h4>
          <div class="gtm-code-block">
      `;
      dataAttrs.forEach(attr => {
        html += `<div class="gtm-data-item">
          <span class="gtm-data-key">${attr.name}:</span>
          <span class="gtm-data-value">${attr.value}</span>
        </div>`;
      });
      html += `</div></div>`;
    }
    
    // Element info
    html += `
        <div class="gtm-section">
          <h4 class="gtm-section-title">Element Details</h4>
          <div class="gtm-data-item">
            <span class="gtm-data-key">Tag:</span>
            <span class="gtm-data-value">${element.tagName.toLowerCase()}</span>
          </div>
    `;
    
    if (element.id) {
      html += `
          <div class="gtm-data-item">
            <span class="gtm-data-key">ID:</span>
            <span class="gtm-data-value">${element.id}</span>
          </div>
      `;
    }
    
    if (element.classList.length > 0) {
      html += `
          <div class="gtm-data-item">
            <span class="gtm-data-key">Classes:</span>
            <span class="gtm-data-value">${Array.from(element.classList).join(', ')}</span>
          </div>
      `;
    }
    
    html += `
        </div>
      </div>
    `;
    
    panel.innerHTML = html;
    document.body.appendChild(panel);
    
    // Add click handlers for copy buttons
    panel.querySelectorAll('[data-copy]').forEach(btn => {
      btn.onclick = () => copyToClipboard(btn.dataset.copy, btn.dataset.label, btn);
    });
  }

  // Handle escape key
  function handleEscape(e) {
    if (e.key === 'Escape' && isLocked) {
      isLocked = false;
      overlay.classList.remove('locked');
      if (panel) {
        panel.remove();
        panel = null;
      }
    }
  }

  // Initialize
  createToggleButton();
  createOverlay();
  
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('click', handleClick, true);
  document.addEventListener('keydown', handleEscape);

  console.log('✨ GTM Inspector activated! Click the button to start inspecting.');
})();
