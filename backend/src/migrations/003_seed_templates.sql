-- Seed block templates/presets
INSERT INTO block_templates (name, type, config, description) VALUES
(
  'Logo Carousel - Default',
  'logo_carousel',
  '{
    "logos": [
      {"id": "logo-1", "url": "", "alt": "", "link": ""},
      {"id": "logo-2", "url": "", "alt": "", "link": ""},
      {"id": "logo-3", "url": "", "alt": "", "link": ""}
    ],
    "settings": {
      "autoplay": true,
      "autoplayInterval": 3000,
      "columns": 3,
      "gap": 20,
      "animation": "slide"
    },
    "styling": {
      "backgroundColor": "#ffffff",
      "paddingX": 40,
      "paddingY": 40
    }
  }',
  'Standard logo carousel with 3 logos, autoplay enabled'
),
(
  'Testimonials - Default',
  'testimonials',
  '{
    "testimonials": [
      {"id": "test-1", "text": "", "author": "", "role": "", "avatar": ""},
      {"id": "test-2", "text": "", "author": "", "role": "", "avatar": ""},
      {"id": "test-3", "text": "", "author": "", "role": "", "avatar": ""}
    ],
    "settings": {
      "displayMode": "carousel",
      "autoplay": false,
      "columns": 1,
      "showRating": true,
      "showAvatar": true
    },
    "styling": {
      "backgroundColor": "#f9fafb",
      "textColor": "#1f2937",
      "accentColor": "#3b82f6",
      "paddingX": 40,
      "paddingY": 40
    }
  }',
  'Classic testimonials carousel with 3 slots'
),
(
  'Features - Default',
  'features',
  '{
    "features": [
      {"id": "feat-1", "icon": "star", "title": "", "description": ""},
      {"id": "feat-2", "icon": "zap", "title": "", "description": ""},
      {"id": "feat-3", "icon": "heart", "title": "", "description": ""}
    ],
    "settings": {
      "columns": 3,
      "layout": "grid",
      "gap": 30,
      "showIcons": true
    },
    "styling": {
      "backgroundColor": "#ffffff",
      "textColor": "#000000",
      "iconColor": "#3b82f6",
      "paddingX": 40,
      "paddingY": 40
    }
  }',
  'Feature grid with 3 items'
) ON CONFLICT (name) DO NOTHING;
