import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookmarkIcon, InfoIcon } from "lucide-react";
import Navigation from "@/components/Navigation";

const BookmarkletInstaller = () => {
  // Minified bookmarklet code (this will be the actual working version)
  const bookmarkletCode = `javascript:(function(){'use strict';const e='gtm-inspector-styles';if(!document.getElementById(e)){const t=document.createElement('style');t.id=e,t.textContent=\`
:root{--gtm-background:220 26% 14%;--gtm-foreground:210 40% 98%;--gtm-card:220 20% 18%;--gtm-card-foreground:210 40% 98%;--gtm-primary:263 70% 60%;--gtm-primary-foreground:210 40% 98%;--gtm-secondary:220 17% 24%;--gtm-secondary-foreground:210 40% 98%;--gtm-muted:220 17% 24%;--gtm-muted-foreground:215 20.2% 65.1%;--gtm-accent:192 91% 55%;--gtm-accent-foreground:220 26% 14%;--gtm-border:220 17% 24%;--gtm-code-bg:220 20% 12%;--gtm-radius:0.75rem;--gtm-transition:all 0.3s cubic-bezier(0.4,0,0.2,1)}.gtm-inspector-overlay{position:fixed;pointer-events:none;border:2px solid hsl(var(--gtm-primary));box-shadow:0 0 30px hsla(263,70%,60%,0.3);z-index:999999;transition:var(--gtm-transition);background:hsla(263,70%,60%,0.1)}.gtm-inspector-overlay.locked{border-color:hsl(120,100%,40%);box-shadow:0 0 30px hsla(120,100%,40%,0.3)}.gtm-inspector-toggle{position:fixed;bottom:20px;left:20px;z-index:1000000;display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;white-space:nowrap;border-radius:0.375rem;font-size:0.875rem;font-weight:500;height:2.75rem;padding:0.5rem 2rem;background:hsl(var(--gtm-primary));color:hsl(var(--gtm-primary-foreground));border:none;cursor:pointer;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;box-shadow:0 10px 15px -3px rgb(0 0 0/0.1),0 4px 6px -4px rgb(0 0 0/0.1);transition:var(--gtm-transition)}.gtm-inspector-toggle:hover{background:hsl(263 70% 50%);box-shadow:0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px -6px rgb(0 0 0/0.1);transform:translateY(-2px)}.gtm-inspector-toggle:active{transform:translateY(0)}.gtm-inspector-toggle.active{background:hsl(120,100%,40%)}.gtm-inspector-panel{position:fixed;bottom:90px;left:20px;width:500px;max-height:70vh;overflow-y:auto;z-index:1000001;border-radius:var(--gtm-radius);border:1px solid hsl(var(--gtm-border));background:hsl(var(--gtm-card));color:hsl(var(--gtm-card-foreground));box-shadow:0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px -6px rgb(0 0 0/0.1);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;animation:gtm-fade-in 0.3s ease-out}@keyframes gtm-fade-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.gtm-card-header{display:flex;flex-direction:column;gap:0.375rem;padding:1.5rem;border-bottom:1px solid hsl(var(--gtm-border))}.gtm-card-title{font-size:1.25rem;font-weight:600;line-height:1.2;letter-spacing:-0.025em}.gtm-card-description{font-size:0.875rem;color:hsl(var(--gtm-muted-foreground))}.gtm-card-content{padding:1.5rem;padding-top:0}.gtm-section{margin-top:1.5rem}.gtm-section-title{font-size:0.875rem;font-weight:600;margin-bottom:0.75rem;color:hsl(var(--gtm-foreground))}.gtm-badge{display:inline-flex;align-items:center;border-radius:9999px;border:1px solid transparent;padding:0.125rem 0.625rem;font-size:0.75rem;font-weight:600;transition:var(--gtm-transition)}.gtm-badge-primary{border-color:transparent;background:hsl(var(--gtm-primary));color:hsl(var(--gtm-primary-foreground))}.gtm-badge-success{border-color:transparent;background:hsl(120,100%,40%);color:hsl(var(--gtm-primary-foreground))}.gtm-badge-warning{border-color:transparent;background:hsl(30,100%,50%);color:hsl(var(--gtm-primary-foreground))}.gtm-badge-secondary{border-color:transparent;background:hsl(var(--gtm-secondary));color:hsl(var(--gtm-secondary-foreground))}.gtm-badge-outline{color:hsl(var(--gtm-foreground));border-color:hsl(var(--gtm-border))}.gtm-selector-item{display:flex;align-items:center;justify-content:space-between;padding:0.75rem;border-radius:calc(var(--gtm-radius) - 2px);border:1px solid hsl(var(--gtm-border));margin-bottom:0.5rem;background:hsl(var(--gtm-background));transition:var(--gtm-transition)}.gtm-selector-item:hover{background:hsl(var(--gtm-secondary))}.gtm-selector-info{flex:1;margin-right:0.5rem}.gtm-selector-type{font-size:0.75rem;font-weight:600;text-transform:uppercase;color:hsl(var(--gtm-muted-foreground));margin-bottom:0.25rem}.gtm-selector-value{font-family:"Monaco","Courier New",monospace;font-size:0.875rem;color:hsl(var(--gtm-primary));word-break:break-all;background:hsl(var(--gtm-code-bg));padding:0.25rem 0.5rem;border-radius:0.25rem;margin:0.25rem 0}.gtm-selector-desc{font-size:0.75rem;color:hsl(var(--gtm-muted-foreground));margin-top:0.25rem}.gtm-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;white-space:nowrap;border-radius:0.375rem;font-size:0.875rem;font-weight:500;padding:0.5rem 0.75rem;border:none;cursor:pointer;transition:var(--gtm-transition);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}.gtm-btn-sm{height:2.25rem;padding:0.5rem 0.75rem}.gtm-btn-ghost{background:transparent;color:hsl(var(--gtm-foreground))}.gtm-btn-ghost:hover{background:hsl(var(--gtm-secondary))}.gtm-btn-outline{border:1px solid hsl(var(--gtm-border));background:hsl(var(--gtm-background));color:hsl(var(--gtm-foreground))}.gtm-btn-outline:hover{background:hsl(var(--gtm-accent));color:hsl(var(--gtm-accent-foreground))}.gtm-code-block{font-family:"Monaco","Courier New",monospace;font-size:0.875rem;background:hsl(var(--gtm-code-bg));color:hsl(var(--gtm-primary));padding:0.75rem;border-radius:calc(var(--gtm-radius) - 2px);word-break:break-all;margin:0.5rem 0;border:1px solid hsl(var(--gtm-border))}.gtm-data-item{display:flex;align-items:center;justify-content:space-between;padding:0.5rem;border-bottom:1px solid hsl(var(--gtm-border))}.gtm-data-item:last-child{border-bottom:none}.gtm-data-key{font-weight:600;font-size:0.875rem;color:hsl(var(--gtm-muted-foreground))}.gtm-data-value{font-family:"Monaco","Courier New",monospace;font-size:0.875rem;color:hsl(var(--gtm-accent))}.gtm-icon{width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round}.gtm-best-selector{background:linear-gradient(135deg,hsl(263 70% 60%),hsl(192 91% 55%));border:2px solid hsl(var(--gtm-primary));padding:1rem;border-radius:var(--gtm-radius);margin-bottom:1.5rem}.gtm-best-title{display:flex;align-items:center;gap:0.5rem;font-weight:600;margin-bottom:0.5rem;color:hsl(var(--gtm-primary-foreground))}.gtm-scrollable{max-height:300px;overflow-y:auto;padding-right:0.5rem}.gtm-scrollable::-webkit-scrollbar{width:8px}.gtm-scrollable::-webkit-scrollbar-track{background:hsl(var(--gtm-background));border-radius:4px}.gtm-scrollable::-webkit-scrollbar-thumb{background:hsl(var(--gtm-primary));border-radius:4px}.gtm-scrollable::-webkit-scrollbar-thumb:hover{background:hsl(263 70% 50%)}\`,document.head.appendChild(t)}const o={eye:'<svg class="gtm-icon" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',eyeOff:'<svg class="gtm-icon" viewBox="0 0 24 24"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>',copy:'<svg class="gtm-icon" viewBox="0 0 24 24"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',check:'<svg class="gtm-icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',star:'<svg class="gtm-icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'};let n=!1,r=!1,l=null,a=null,s=null,i=null,c=null;function d(t){try{return 1===document.querySelectorAll(t).length}catch{return!1}}function m(t){if(t.id)return\`//\*[@id="\${t.id}"]\`;const e=[];for(;t&&t.nodeType===Node.ELEMENT_NODE;){let o=0,n=t.previousSibling;for(;n;)n.nodeType===Node.ELEMENT_NODE&&n.nodeName===t.nodeName&&o++,n=n.previousSibling;const r=t.nodeName.toLowerCase(),l=o>0?\`[\${o+1}]\`:"";e.unshift(r+l),t=t.parentNode}return e.length?"/"+e.join("/"):""}function u(t){const e=[];if(t.id&&e.push({type:"ID",value:\`#\${t.id}\`,priority:1,unique:d(\`#\${t.id}\`),description:"Highest specificity, best for unique elements"}),Array.from(t.attributes).forEach(t=>{if(t.name.startsWith("data-")){const o=\`[\${t.name}="\${t.value}"]\`;e.push({type:"Data Attribute",value:o,priority:2,unique:d(o),description:"Recommended for GTM - semantic and stable"})}}),t.classList.length>0){const o=Array.from(t.classList);if(o.forEach(t=>{const o=\`.\${t}\`;e.push({type:"Class",value:o,priority:3,unique:d(o),description:"May match multiple elements"})}),o.length>1){const t="."+o.join(".");e.push({type:"Combined Classes",value:t,priority:3,unique:d(t),description:"More specific than single class"})}}const o=t.tagName.toLowerCase();e.push({type:"Tag",value:o,priority:5,unique:d(o),description:"Least specific, matches all similar elements"});const n=t.parentElement;if(n){const r=Array.from(n.children).indexOf(t)+1,l=\`\${o}:nth-child(\${r})\`;e.push({type:"nth-child",value:l,priority:4,unique:d(l),description:"Position-based, may break if DOM changes"})}return e.sort((t,e)=>t.priority-e.priority)}function p(){s||(s=document.createElement("button"),s.className="gtm-inspector-toggle",s.innerHTML=o.eye+'<span>Activate Inspector</span>',s.onclick=g,document.body.appendChild(s))}function g(){n=!n,n?(s.classList.add("active"),s.innerHTML=o.eyeOff+"<span>Deactivate</span>",a.style.display="block"):(s.classList.remove("active"),s.innerHTML=o.eye+'<span>Activate Inspector</span>',a.style.display="none",r=!1,i&&(i.remove(),i=null))}function h(t){if(!n||r)return;const e=document.elementFromPoint(t.clientX,t.clientY);if(!e||e===a||e===s||i&&i.contains(e))return;l=e;const o=e.getBoundingClientRect();a.style.top=o.top+window.scrollY+"px",a.style.left=o.left+window.scrollX+"px",a.style.width=o.width+"px",a.style.height=o.height+"px"}function y(t){n&&l&&(i&&i.contains(t.target)||(t.preventDefault(),t.stopPropagation(),r=!0,a.classList.add("locked"),b(l)))}async function v(t,e,n){try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(t);else{const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.left="-999999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)}const r=n.innerHTML;n.innerHTML=o.check+"<span>Copied!</span>",n.style.background="hsl(120, 100%, 40%)",c&&clearTimeout(c),c=setTimeout(()=>{n.innerHTML=r,n.style.background=""},2e3)}catch(t){console.error("Copy failed:",t),alert("Failed to copy. Please try manually selecting the text.")}}function b(t){i&&i.remove();const e=u(t),n=e.find(t=>t.unique)||e[0],r=m(t),l=Array.from(t.attributes).filter(t=>t.name.startsWith("data-"));i=document.createElement("div"),i.className="gtm-inspector-panel";let a=\`
      <div class="gtm-card-header">
        <h3 class="gtm-card-title">Element Inspector</h3>
        <p class="gtm-card-description">
          <span class="gtm-badge gtm-badge-success">Locked</span>
          Click outside or press ESC to unlock
        </p>
      </div>
      <div class="gtm-card-content">
        <div class="gtm-best-selector">
          <div class="gtm-best-title">
            \${o.star}
            <span>Best Selector for GTM</span>
          </div>
          <div class="gtm-selector-value">\${n.value}</div>
          <div style="margin-top: 0.5rem;">
            <button class="gtm-btn gtm-btn-sm gtm-btn-outline" data-copy="\${n.value}" data-label="Best Selector">
              \${o.copy}
              <span>Copy</span>
            </button>
          </div>
        </div>
        <div class="gtm-section">
          <h4 class="gtm-section-title">All Selector Options</h4>
          <div class="gtm-scrollable">\`;e.forEach(t=>{const e=t.unique?"gtm-badge-success":t.priority<=2?"gtm-badge-warning":"gtm-badge-secondary",n=t.unique?"Unique":\`\${document.querySelectorAll(t.value).length} matches\`;a+=\`
        <div class="gtm-selector-item">
          <div class="gtm-selector-info">
            <div class="gtm-selector-type">\${t.type}</div>
            <div class="gtm-selector-value">\${t.value}</div>
            <div class="gtm-selector-desc">\${t.description}</div>
            <div style="margin-top: 0.25rem;">
              <span class="gtm-badge \${e}">\${n}</span>
            </div>
          </div>
          <button class="gtm-btn gtm-btn-sm gtm-btn-ghost" data-copy="\${t.value}" data-label="\${t.type}">
            \${o.copy}
          </button>
        </div>
      \`}),a+=\`
          </div>
        </div>
        <div class="gtm-section">
          <h4 class="gtm-section-title">XPath</h4>
          <div class="gtm-code-block">\${r}</div>
          <button class="gtm-btn gtm-btn-sm gtm-btn-outline" data-copy="\${r}" data-label="XPath">
            \${o.copy}
            <span>Copy XPath</span>
          </button>
        </div>
    \`,l.length>0&&(a+=\`
        <div class="gtm-section">
          <h4 class="gtm-section-title">Data Attributes</h4>
          <div class="gtm-code-block">
      \`,l.forEach(t=>{a+=\`<div class="gtm-data-item">
          <span class="gtm-data-key">\${t.name}:</span>
          <span class="gtm-data-value">\${t.value}</span>
        </div>\`}),a+="</div></div>"),a+=\`
        <div class="gtm-section">
          <h4 class="gtm-section-title">Element Details</h4>
          <div class="gtm-data-item">
            <span class="gtm-data-key">Tag:</span>
            <span class="gtm-data-value">\${t.tagName.toLowerCase()}</span>
          </div>
    \`,t.id&&(a+=\`
          <div class="gtm-data-item">
            <span class="gtm-data-key">ID:</span>
            <span class="gtm-data-value">\${t.id}</span>
          </div>
      \`),t.classList.length>0&&(a+=\`
          <div class="gtm-data-item">
            <span class="gtm-data-key">Classes:</span>
            <span class="gtm-data-value">\${Array.from(t.classList).join(", ")}</span>
          </div>
      \`),a+="</div></div>",i.innerHTML=a,document.body.appendChild(i),i.querySelectorAll("[data-copy]").forEach(t=>{t.onclick=()=>v(t.dataset.copy,t.dataset.label,t)})}function f(t){"Escape"===t.key&&r&&(r=!1,a.classList.remove("locked"),i&&(i.remove(),i=null))}p(),a||(a=document.createElement("div"),a.className="gtm-inspector-overlay",a.style.display="none",document.body.appendChild(a)),document.addEventListener("mousemove",h),document.addEventListener("click",y,!0),document.addEventListener("keydown",f),console.log("✨ GTM Inspector activated! Click the button to start inspecting.")})();`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <Navigation />
      <div className="max-w-4xl mx-auto space-y-8 p-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            GTM Inspector Bookmarklet
          </h1>
          <p className="text-lg text-muted-foreground">
            A powerful tool to inspect and extract CSS selectors for Google Tag Manager
          </p>
        </div>

        <Card className="border-primary/50 shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookmarkIcon className="w-5 h-5 text-primary" />
              Installation
            </CardTitle>
            <CardDescription>
              Drag the button below to your bookmarks bar to install
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-dashed border-primary/50">
              <a
                href={bookmarkletCode}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-lg hover:scale-105 cursor-move"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Please drag this button to your bookmarks bar instead of clicking it!");
                }}
              >
                <BookmarkIcon className="w-4 h-4" />
                GTM Inspector
              </a>
            </div>

            <Alert>
              <InfoIcon className="w-4 h-4" />
              <AlertDescription>
                <strong>How to install:</strong> Drag the "GTM Inspector" button above to your browser's bookmarks bar.
                If you don't see your bookmarks bar, press Ctrl+Shift+B (Windows) or Cmd+Shift+B (Mac) to show it.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
            <CardDescription>Follow these steps to inspect elements</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 list-decimal list-inside text-sm">
              <li>Navigate to any webpage you want to inspect</li>
              <li>Click the <strong>GTM Inspector</strong> bookmark in your bookmarks bar</li>
              <li>Click the <strong>Activate Inspector</strong> button that appears in the bottom-left</li>
              <li>Hover over any element to highlight it</li>
              <li>Click on an element to lock the inspector and view all available selectors</li>
              <li>Copy the selector that best fits your needs (the tool recommends the best one)</li>
              <li>Press <strong>ESC</strong> or click outside to unlock and inspect another element</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span>
                <span><strong>Multiple selector types:</strong> ID, data attributes, classes, tags, nth-child, and XPath</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span>
                <span><strong>Smart recommendations:</strong> Automatically suggests the best selector for GTM</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span>
                <span><strong>Uniqueness detection:</strong> Shows which selectors uniquely identify elements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span>
                <span><strong>One-click copy:</strong> Copy any selector or XPath with a single click</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">✓</span>
                <span><strong>Beautiful UI:</strong> Styled with the same design system as this app</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookmarkletInstaller;
