import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'star-component',
  shadow: true
})
export class StarComponent {
  @Prop() width: number;

  @Prop() height: number;

  @Prop() x: number;

  @Prop() y: number;

  @Prop() shortR: number;

  @Prop() longR: number;

  @Prop() svgStyle: string;

  @Prop() rotate: number;

  @Prop() fill: string;

  @Prop() stroke: string;

  render() {
    const d: string = this.computedPath(this.x, this.y, this.shortR, this.longR, this.rotate);

    return <svg style={this.svgStyle ? this.svgStyle : 'border: 1px solid gray'}
      width={this.width} height={this.height}
      fill={this.fill ? this.fill : 'none'}
      stroke={this.stroke ? this.stroke : 'gray'}>
      <path d={d}></path>
    </svg>;
  }

  private computedPath(x, y, r, R, rotate = 0): string {
    const rad = Math.PI / 180; // 弧度单位
    let count = 0;
    let points = [];
    x = x == null ? this.width / 2 : x;
    y = y == null ? this.height / 2 : y;
    while (count++ <= 4) {
      // 由于前端的坐标系与数学意义上的坐标系在Y轴上是放过来的，所以这里对角度做取反
      const rRad = (((360 - 54) + 72 * count) - rotate) * rad;
      const RRad = (((360 - 18) + 72 * count) - rotate) * rad;
      const rx = Math.cos(rRad) * r + x;
      const ry = Math.sin(rRad) * r + y;
      const Rx = Math.cos(RRad) * R + x;
      const Ry = Math.sin(RRad) * R + y;
      points.push([rx, ry]);
      points.push([Rx, Ry]);
    }
    return points.reduce((prev, curr, index) => {
      if (index == 0) {
        return `M${curr[0]},${curr[1]}`;
      } else if (index == points.length - 1) {
        return `${prev}L${curr[0]},${curr[1]}Z`;
      } else {
        return `${prev}L${curr[0]},${curr[1]}`;
      }
    }, '');
  }
}
