import {
  Component,
  OnInit,
  Input,
  SimpleChanges
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';

interface ProvinceVlaue {
    name: string;
    value: number
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {
    @Input() data:[];
    constructor(
        private http: HttpClient
    ){}

    ngOnInit() {
        //this.setMap();
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        if(changes.data.currentValue) {
            let result = this.dealData(changes.data.currentValue);
            console.log(result);
            this.setMap(result);
        }
    }

    setMap(result: ProvinceVlaue[]): void {
        this.http.get('assets/json/baiduchina.json').subscribe(
            function(res) {
                echarts.registerMap('china', res); //利用json引入示例
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('china-map'));
                let option = {
                    tooltip: {
                        triggerOn: "click",
                        position: 'right',
                        formatter: function (e, t, n) {
                            return e.seriesName + "<br />" + e.name + "：" + e.value
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 100000,
                        left: 26,
                        bottom: 40,
                        showLabel: !0,
                        text: ["高", "低"],
                        pieces: [
                            {
                            gt: 10000,
                            label: "> 10000 人",
                            color: "rgb(127,17,0)"
                        }, 
                        {
                            gte: 1000,
                            lte: 9999,
                            label: "1000 - 9999 人",
                            color: "rgb(189,19,22)"
                        }, 
                        {
                            gte: 500,
                            lt: 999,
                            label: "500 - 999 人",
                            color: "rgb(230,75,69)"
                        }, 
                        {
                            gt: 100,
                            lt: 499,
                            label: "100 - 499 人",
                            color: "rgb(255,140,113)"
                        }, 
                        {
                            gt: 10,
                            lt: 99,
                            label: "10 - 99 人",
                            color: "rgb(253,210,160)"
                        },
                        {
                            gt: 0,
                            lt: 9,
                            label: "1 - 9 人",
                            color: "rgb(255,242,207)"
                        },
                        {
                            value: 0,
                            color: "#ffffff"
                        }],
                        show: !0
                    },
                    geo: {
                        map: "china",
                        roam: !1,
                        scaleLimit: {
                        min: 1,
                        max: 2
                        },
                        zoom: 1.23,
                        top: 120,
                        label: {
                        normal: {
                            show: !0,
                            fontSize: "14",
                            color: "rgba(0,0,0,0.7)"
                        }
                        },
                        itemStyle: {
                        normal: {
                            //shadowBlur: 50,
                            //shadowColor: 'rgba(0, 0, 0, 0.2)',
                            borderColor: "rgba(0, 0, 0, 0.2)"
                        },
                        emphasis: {
                            areaColor: "#f2d5ad",
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            borderWidth: 0
                        }
                        }
                    },
                    series: [{
                        name: "确诊病例",
                        type: "map",
                        geoIndex: 0,
                        data: result
                    }]
                };
                // 绘制图表
                myChart.setOption(option);
                setTimeout(function(){
                    myChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex:0,  // 显示第几个series
                        dataIndex: 10 // 显示第几个数据
                    });
                })
            }
        );
    }

    //处理返回数据
    dealData(area:[]): ProvinceVlaue[] {
        let data = area.map((item:{provinceName: string, confirmedCount: number}) => {return {name: item.provinceName, value: item.confirmedCount}});
        return data;
    }
}
