import { ViewportSize } from 'playwright';

export interface TestConfig {
  headless: boolean;
  slowMo?: number;
  viewport?: ViewportSize;
}
