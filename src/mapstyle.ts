import type { LayerProps } from '@vis.gl/react-maplibre';

export const routeStyle: LayerProps = {
  id: 'route',
  type: 'line',
  source: 'route',
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#888',
    'line-width': 8
  }
};