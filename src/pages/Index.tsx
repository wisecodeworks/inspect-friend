import { useState } from "react";
import { CSSInspector } from "@/components/CSSInspector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [inspectorActive, setInspectorActive] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <CSSInspector 
        isActive={inspectorActive} 
        onToggle={setInspectorActive} 
        showToggleButton={false} 
      />
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">
          Developer Tool
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          CSS Inspector
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Hover over any element to reveal its CSS properties, classes, and selectors. 
          Perfect for setting up tracking in Google Tag Manager.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg" 
            variant="default"
            onClick={() => setInspectorActive(true)}
          >
            Try Inspector Now
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="#demo">Learn More</a>
          </Button>
        </div>
        
        {inspectorActive && (
          <div className="mt-4 animate-fade-in">
            <Badge 
              className="bg-green-600 text-white cursor-pointer hover:bg-green-700 transition-colors"
              onClick={() => setInspectorActive(false)}
            >
              Inspector Active - Hover over elements below to explore! (Click to disable)
            </Badge>
          </div>
        )}
      </header>

      {/* Demo Section */}
      <section id="demo" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Try It Out</h2>
        <p className="text-center text-muted-foreground mb-12">
          Click "Enable Inspector" in the top right, then hover over any element below
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Card 1 */}
          <Card 
            className="p-6 hover:shadow-xl transition-shadow" 
            id="demo-card-1"
            data-component="feature-card"
            data-section="demo"
          >
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Detection</h3>
            <p className="text-muted-foreground">
              Hover over any element to instantly see its CSS properties and tracking identifiers.
            </p>
          </Card>

          {/* Card 2 */}
          <Card 
            className="p-6 hover:shadow-xl transition-shadow"
            id="demo-card-2"
            data-component="feature-card"
            data-section="demo"
          >
            <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Copy with One Click</h3>
            <p className="text-muted-foreground">
              Quickly copy classes, IDs, and selectors to use in your tracking setup.
            </p>
          </Card>

          {/* Card 3 */}
          <Card 
            className="p-6 hover:shadow-xl transition-shadow"
            data-component="feature-card"
            data-section="demo"
            data-tracking="enabled"
          >
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Data Attributes</h3>
            <p className="text-muted-foreground">
              See all data attributes - essential for modern tracking implementations.
            </p>
          </Card>

          {/* Card 4 */}
          <Card 
            className="p-6 hover:shadow-xl transition-shadow"
            data-component="feature-card"
            data-section="demo"
            data-priority="high"
          >
            <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">CSS Selectors</h3>
            <p className="text-muted-foreground">
              Generate accurate CSS selectors for precise element targeting in GTM.
            </p>
          </Card>
        </div>
      </section>

      {/* Interactive Elements Section */}
      <section className="container mx-auto px-4 py-12 mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Interactive Elements</h2>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="default" data-button="primary-cta">
            Primary Button
          </Button>
          <Button variant="secondary" data-button="secondary-cta">
            Secondary Button
          </Button>
          <Button variant="outline" data-button="outline-cta">
            Outline Button
          </Button>
          <Badge className="text-sm" data-badge="status">Status Badge</Badge>
          <Badge variant="secondary" data-badge="category">Category</Badge>
        </div>
      </section>
    </div>
  );
};

export default Index;
