window.onload = function() {
	//取浏览器的高
	var winWidth = window.innerWidth-20;
	var winHeight = winWidth * 1080 / 1920-10;
	//console.log(winWidth);
	var Warp = document.getElementById('js_SalesSettlementWarp');

	Warp.style.width = winWidth + 'px';
	Warp.style.height = winHeight + 'px';

	var cc1 = document.getElementById('js_SalesSettlementCanvas');
	cc1.style.width = winWidth + 'px';
	cc1.style.height = winHeight * 0.7 + 'px';

	var main1 = document.getElementById('main1');
	main1.style.width = winWidth  + 'px';
	var main2 = document.getElementById('main2');
	main2.style.width = winWidth + 'px';
    if(winWidth <1366 && winWidth >1024){
		main2.style.height = (winHeight * 0.36) + 'px';
		main1.style.height = (winHeight * 0.35) + 'px';
	}else if(winWidth < 1280){
		main1.style.height = (winHeight * 0.39) + 'px';
		main2.style.height = (winWidth * 0.22) + 'px';	
	}else if(winWidth >1340 && winWidth < 3000){
		main1.style.height = (winHeight * 0.32) + 'px';
		main2.style.height = (winHeight * 0.32) + 'px';
		main2.style.top = '58%';
	}else{
		main1.style.height = (winHeight * 0.29) + 'px';
		main2.style.height = (winHeight * 0.27) + 'px';
		main1.style.top = '8%';
		main2.style.top = '60%';
	}
	
	// 表一、表二数据
	var salesData = {
		// 数据时点
		dateD: {
			date: '2016-11-18',
			time: '14：01'
		},
		
		// 图表,data[0] 表1，data[1] 表2
		chartsData: [{
			title: '2016年销售结算量',
			chart: [42, 54, 66, 56, 54, 63, 53, 69],		// 条形数据
			markLine: 411									// 目标值
		},{
			title: '2016年销售结算量',
			chart: [14, 12, 20, 21, 20, 25, 18, 22],		// 条形数据
			markLine: 211									// 目标值
		}],
		
		// 年度、季度、月度
		statisticData: {
			year: {
				num: 361,
				money: 136.45
			},
			quarter: {
				num: 81.88,
				money: 35.16
			},
			month: {
				num: 36.76,
				money: 27.43
			}
		}
	};
	/**
	 * 
	 * @param {Object} params
	 * 2016.11.18
	 */
	!(function loadData(params){
		// 数据时点
		var dateD = document.getElementById('dateD');
		dateD.getElementsByTagName('span')[0].innerHTML = params.dateD.date;
		dateD.getElementsByTagName('span')[1].innerHTML = params.dateD.time;
		
		// 表一、表二数据
		var barArrtable1 = params.chartsData[0].chart;
		var barArrdata1 = params.chartsData[1].chart;
		var mTar = {
			markLine1: params.chartsData[0].markLine,
			markLine2: params.chartsData[1].markLine
		};
		showAmount(barArrtable1, barArrdata1, mTar);
		
		// 设置title
		var canvasWrap = document.getElementById('js_SalesSettlementCanvas');
		canvasWrap.getElementsByTagName('h1')[0].innerHTML = params.chartsData[0].title + '<span>（单位：万吨）</span>';
		canvasWrap.getElementsByTagName('h1')[1].innerHTML = params.chartsData[1].title + '<span>（单位：亿元）</span>';
		
		// 年度、季度、月度
		function setData(id){
			var tar = document.getElementById(id);
			var cell = tar.getElementsByTagName('div');
			var text = id === 'year' ? params.statisticData.year : id === 'quarter' ? params.statisticData.quarter : params.statisticData.month;
			cell[0].getElementsByTagName('span')[0].innerHTML = text.num;
			cell[1].getElementsByTagName('span')[0].innerHTML = text.money;
		}
		setData('year');
		setData('quarter');
		setData('month');
		
	})(salesData);

	document.getElementsByTagName('body')[0].style.display="block";
}
