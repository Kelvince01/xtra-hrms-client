// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
import {LineChart} from 'echarts/charts';
// Import bar charts, all suffixed with Chart
import {BarChart} from 'echarts/charts';
// Import the tooltip, title, rectangular coordinate system, dataset and transform components
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components';
// Features like Universal Transition and Label Layout
import {LabelLayout, UniversalTransition} from 'echarts/features';

// Import the Canvas renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {CanvasRenderer} from 'echarts/renderers';

// Import the theme
import 'echarts/theme/macarons.js';
import Marcaron from '@shared/utils/marcaron';

// Register the required components
echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
echarts.registerTheme('macarons', Marcaron);
