/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Options {
  width: number;
  height: number;
  margin: Margin;
  backgroundColor?: string;
  responsive?: boolean;
  xAxis?: AxisProperties;
}

export interface AxisProperties {
  padding?: number;
}

export interface Margin {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface ScaleProperties {
  domain: any;
  range: any;
  padding?: any;
}
