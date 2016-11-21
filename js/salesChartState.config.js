/**
 * 
 * @param {Array} arr1	。。。
 * @param {Array} arr2	。。。
 */
function showAmount(arr1, arr2, monthTar){
	var	ratio = window.innerWidth / 1920,	// 比值
//		tailLen = 35,						// 尾巴长
//		tailHei = 3,						// 尾巴厚
		circleSize = 11;					// 折线symbol红点大小
	
	var size = 20 * ratio ;					// 全局字体
	// 颜色：lineStyle、圆点、lineItem、label
	var colorPane = ['#FFCC00', '#F00', '#FF0', '#F20'];
	
	var barArrtable1 = arr1;				// 表1
	var barArrdata1 = arr2;					// 表2
	

	// 每两个月数值总和
	var barArrtable2 = summary(barArrtable1, 680);
	var barArrdata2 = summary(barArrdata1, 240);
	
	var barArrtable2Bak = summary(barArrtable1);
	var barArrdata2Bak = summary(barArrdata1);
	//	var barArrtable2 = [42, 345, 156, 212, 276, 348, 411, 486];
	/**
	 * 求数组中每两个值之和并返回新数组
	 * @param {Array} data
	 * 
	 */
	function summary(data, max){
		var arr = [];
		var s = data[0];
		arr.push(s);
		for(var i=1;i<data.length;i++){
			s = s + data[i];
			if(max && s > max){
				arr.push(max);
			}else{
				arr.push(s);
			}
//			arr.push(s);
		}
		return arr;
	}
	
	// 折线symbol小红圆点设置
	var mpData1 = mpData(barArrtable1, 680), 
		mpData2 = mpData(barArrdata1, 240);
	/**
	 * 添加折线小红点数据
	 * 添加首尾小尾巴
	 * @param {Array} arr
	 */
	function mpData(arr, max){
		var mpData = [];
		var mpDataSum = summary(arr);
		// 从1开始，情况需要
		for(var i=1;i<arr.length+1;i++){
			mpData.push({
				xAxis: i,
				yAxis: mpDataSum[i-1] >= max ? max : mpDataSum[i-1]
			});
		}
		// 添加尾巴
//		mpData.unshift({
//			itemStyle: {
//				normal: {
//					color: '#F8B551'
//				}
//			},
//			symbol: 'rect',
//			symbolSize: [tailLen * ratio, tailHei],
//			symbolOffset: [-tailLen * ratio * 0.5, 0],
//			xAxis: 1,
//			yAxis: mpDataSum[0]
//		},{
//			itemStyle: {
//				normal: {
//					color: '#F8B551'
//				}
//			},
//			symbol: 'rect',
//			symbolSize: [tailLen * ratio, tailHei],
//			symbolOffset: [tailLen * ratio * 0.5, 0],
//			xAxis: arr.length,
//			yAxis: mpDataSum[arr.length-1]
//		});
		
		return mpData;
	}	
	
	
	/**
	 * 判断重叠，根据数据在俩坐标轴中的比值来判断
	 * 经测试，比值差距为0.1时会重叠
	 * @param {Number} r1 比值
	 * @param {Number} r2 比值
	 * @param {Number} tarRatio 比值差
	 */
	function ifOverlay(r1,r2,tarRatio){
		return Math.abs(r1 - r2) > tarRatio;
	}
	/**
	 * 比值
	 * @param {Number} val 数据值
	 * @param {Number} num 坐标最大值
	 */
	function getRatio(val,num){
		val = val.value || val;
		return val / num;
	}
	// 判断表一
	for(var r=0;r<barArrtable1.length;r++){
		var ratio1 = getRatio(barArrtable1[r],80);
		var ratio2 = getRatio(barArrtable2[r],680);
		if(!ifOverlay(ratio1,ratio2,0.1)){
			barArrtable1.splice(r,1,{
				value: barArrtable1[r],
				label: {
					normal: {
						position: [18 * ratio, -40 * ratio]
					}
				}
			});
			if(barArrtable2[r] >= 680){
				barArrtable2.splice(r,1,{
					value: 680,
					label: {
						normal: {
							position: 'bottom',
							formatter: function(){
								return barArrtable2Bak[r];
							}
						}
					}
				});
			}else{
				barArrtable2.splice(r,1,{
					value: barArrtable2[r],
					label: {
						normal: {
							position: 'bottom'
						}
					}
				});
			}
		}else{
			if(barArrtable2[r] >= 680){
				barArrtable2.splice(r,1,{
					value: 680,
					label: {
						normal: {
							formatter: '' + barArrtable2Bak[r]
						}
					}
				});
			}
		}
	}
	// 判断表二
	for(var r=0;r<barArrdata1.length;r++){
		var ratio1 = getRatio(barArrdata1[r],40);
		var ratio2 = getRatio(barArrdata2[r],240);
		if(!ifOverlay(ratio1,ratio2,0.1)){
			barArrdata1.splice(r,1,{
				value: barArrdata1[r],
				label: {
					normal: {
						position: [18 * ratio, -55 * ratio]
					}
				}
			});
			if(barArrdata2[r] >= 240){
				barArrdata2.splice(r,1,{
					value: 240,
					label: {
						normal: {
							position: 'bottom',
							formatter: '' + barArrdata2Bak[r]
						}
					}
				});
			}else{
				barArrdata2.splice(r,1,{
					value: barArrdata2[r],
					label: {
						normal: {
							position: 'bottom'
						}
					}
				});
			}
		}else{
			if(barArrdata2[r] >= 240){
				barArrdata2.splice(r,1,{
					value: 240,
					label: {
						normal: {
							formatter: '' + barArrdata2Bak[r]
						}
					}
				});
			}
		}
	}
	
	// 不满十二个月的数值，用0补满
	barArrtable1 = plusData(barArrtable1, 80);
	barArrtable2.unshift('-');
	barArrdata1 = plusData(barArrdata1, 40);
	barArrdata2.unshift('-');
	/**
	 * 
	 * @param {Array} arr
	 * 没有数值的月份补0，
	 * '-'使前后空出一段距离，
	 * 为保持两个表的0值条形图高度一致，多加个参数用以判断
	 */
	function plusData(arr,maxV){
		while(arr.length < 12){
			arr.push({
				value: maxV * 0.03,
				label: {
					normal: {
						formatter: function(){
							return 0;
						}
					}
				}
			});
		}
		arr.push('-');
		arr.unshift('-');
		return arr;
	}
	
	var myChart2 = echarts.init(document.getElementById('main1'));
	var myChart = echarts.init(document.getElementById('main2'));

	var option = {
		grid:{
			left:'5%',
			right:'7%',
		},
		tooltip: {
			trigger: 'axis'
		},
		textStyle:{
			fontSize: size
		},
		xAxis: [{
			type: 'category',
			
			data: ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',''],
			boundaryGap: true,
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
//			calculable:false,
			axisLabel:{
				textStyle:{
					fontSize:size*0.7
				}
			}
		}],
		yAxis: [{
			type: 'value',
			position:'left',	
			min: 0,
			max: 40,
			interval: 10,
			axisLabel:{
				show: false,
                textStyle: {
					fontSize: size * 0.8
				}
            },
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			}
		}, {
			type: 'value',
			position:'right',
			min: 0,
			max: 240,
			interval: 60,
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel:{
				show: false,
				textStyle: {
					fontSize: size * 0.8
				}
			}
		}],
		series: [
			{
				name: '月销售金额',
				type: 'bar',
				default: false,
				itemStyle: {
					normal: {
						color: '#00A1E7',
						position: 'top',
						barGap:'2%'
					}
				},
				barWidth:'50%',
				label: {
					normal: {
						show: true,
						position: 'top',
						color: '#04984a'
					}
				},
//				data: ['-',14, 12, 20, 17, 18, 19, 16, 21, '-', '-', '-', '-', '-'],
				data: barArrdata1
			},
			{
				name: '累计销售金额',
				type: 'line',
				default: false,
				lineStyle: {
					normal: {
						width: 3,
						color: colorPane[0]
					}
				},
				itemStyle: {
					normal: {
						color: colorPane[2]
					}
				},
				label: {
					normal: {
						show: true,
						position: 'top',
						textStyle: {
							color: colorPane[3]
						}
					}
				},
				symbol: 'circle',
				yAxisIndex: 1,
				symbolSize: size * 0.8,
//				data: ['-', 14, 26, 46, 64, 83, 102, 119, 140, '-', '-', '-', '-', '-']			
				data: barArrdata2,
				markLine: {
					label: {
						normal: {
							position: 'end',
							formatter: '{c}',
							
						}
					},
					symbol: 'none',
					lineStyle: {
						normal: {
							color: '#da494e',
							width:2,
							opacity: 0.4
						}
					},
					data: [{
						name: '累计销售金额',
						yAxis: monthTar.markLine2,
						symbolSize:size*10
					}]
				},
				markPoint: {
					label: {
						normal: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							color: '#DA494E'
						}
					},
					symbol: 'circle',
					symbolSize: circleSize * ratio,
					data: mpData2
				}
			}
		]
	};
	myChart.setOption(option);

	//第二个

	var myChart2 = echarts.init(document.getElementById('main1'));

	var option2 = {
		textStyle: {
			fontSize: size
		},
		grid:{
			left:'5%',
			right:'7%',
		},
		tooltip: {
			trigger: 'axis'
		},
		textStyle:{
			fontSize:size
		},
		xAxis: [{
			type: 'category',
			data: ['','1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', ''],
			boundaryGap: true,
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel:{
				textStyle:{
					fontSize:size*0.69
				}
			}
		}],
		yAxis: [{
			type: 'value',
			min: 0,
			max: 80,
			interval: 20,
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel:{
				show: false,
				textStyle: {
					fontSize: size * 0.8
				}
			}
		}, {
			type: 'value',
			min: 0,
			max: 680,
			interval: 170,
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel:{
				show: false,
				textStyle: {
					fontSize: size * 0.8
				}
			}
		}],
		series: [

			{
				name: '月销售量',
				type: 'bar',
				default: false,
				itemStyle: {
					normal: {
						color: '#00A1E7',
						position: 'top'
					}
				},
				barWidth:'50%',
				label: {
					normal: {
						show: true,
						position: 'top',
						textStyle: {
//							color: '#04984a'
//							color: '#000'
						}
					}
				},
//				data: ['-', 42, 44, 66, 56, 54, 63, 43, 69, '-', '-', '-', '-', '-'],
				data: barArrtable1
			},
			{
				name: '累计销售量',
				type: 'line',
				default: false,
				itemStyle: {
					normal: {
						color: colorPane[2]
					}
				},
				lineStyle: {
					normal: {
						color: colorPane[0],
						width: 3
					}
				},
				label: {
					normal: {
						show: true,
						position: 'top',
						textStyle: {
							color: colorPane[3]
						}
					}
				},
				symbol: 'circle',
				yAxisIndex: 1,
				symbolSize: size * 0.8,
//				data: ['-', 42, 87, 153, 209, 264, 327, 371, 436, '-', '-', '-', '-', '-'],
				data: barArrtable2,
				markLine: {
					label: {
						normal: {
							position: 'end',
							formatter: '{c}'
						}
					},
					symbol: '',
					lineStyle: {
						normal: {
							color: '#da494e',
							width:2,
							opacity: 0.4
						}
					},
					data: [{
						name: '累计销售量',
						yAxis: monthTar.markLine1,
						value:size*10
					}]
				},
				markPoint: {
					label: {
						normal: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							color: '#DA494E'
						}
					},
					symbol: 'circle',
					symbolSize: circleSize * ratio,
					data: mpData1
				}
			}
		]
	};

	myChart2.setOption(option2);
}