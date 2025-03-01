//inject angular file upload directives and services.
var app = angular.module('layoutSample', ['ngMaterial']);

app.controller('MyCtrl', ['$scope',function ($scope) {	

	/**
	* 버전 관리
	* 소스 수정 시 단위 까지는 신경쓰지 말고 자유롭게 버전을 올려주세요
	*/
	$scope.version = '1.1'
	
    /**
     * 피스 범위 정의
     *      a   100피스 이하
     *      b   101 ~ 120피스
     *      c   121 ~ 140피스
     *      d   141피스 이상
     */     
    /**
     * 옵션
     *      op1     기장섞음
     *      op2     특이색상
     *      op3     원장,부원장
	 *      op4     실장
     */

    /**
     *      우레탄피스
     * 
     *      인치    a         b       c       d
     *      18     3800     3000    2200    1400
     *      20     4100     3300    2500    1700
     *      22     4400     3600    2800    2000
     *      24     4700     3900    3100    2300
     *      26     5100     4300    3500    2700         
     *
     * 
     *      노팁피스
     * 
     *      인치    a         b       c       d
     *      18     4200     3700    3200    2700
     *      20     4500     4000    3500    3000
     *      22     4900     4400    3900    3400       
     */
    
    const price1 = {
        i18: { a: 4200, b: 3700, c: 3700, d: 3700, op1: 30000 },
        i20: { a: 4500, b: 4000, c: 4000, d: 4000, op1: 30000 },
        i22: { a: 4800, b: 4300, c: 4300, d: 4300, op1: 30000 },
        i24: { a: 5100, b: 4600, c: 4600, d: 4600, op1: 30000 },
        i26: { a: 5400, b: 4900, c: 4900, d: 4900, op1: 0 }
    } 
    const price2 = {
        i18: { a: 4700, b: 4200, c: 4200, d: 4200, op1: 30000 },
        i20: { a: 5000, b: 4500, c: 4500, d: 4500, op1: 30000 },
        i22: { a: 5300, b: 4800, c: 4800, d: 4800, op1: 30000 }        
    } 
    const price3 = {
        op2: 30000, // 특이색상
        op3: 400,   // 원장, 부원장 피스당 추가 금액
		op4: 200	// 실장 피스당 추가 금액
    }

    

    $scope.data = {
        box1: {
            check1: false,
            check2: false,
            check3: false,
			check4: false,
            inch: 'i18',
            count: 0,
            result: ''
        },
        box2: {
            check1: false,  
            check3: false,
			check4: false,
            inch: 'i18',
            count: 0,
            result: ''
        }
    }
    $scope.discount1 = '';    
    $scope.discount2 = '';    

    $scope.reset1 = () => {
        let obj = $scope.data.box1;
        Object.keys(obj).forEach(key => {            
            if(typeof obj[key] == 'boolean') {obj[key] = false}
            else {obj[key] = ''}
        })    
    }
    $scope.reset2 = () => {
        let obj = $scope.data.box2;
        Object.keys(obj).forEach(key => {            
            if(typeof obj[key] == 'boolean') {obj[key] = false}
            else {obj[key] = ''}
        })  
    }

    $scope.calculate1 = () => {
        let data = $scope.data.box1;
        let price = price1;        
        $scope.calculate(data, price, $scope.discount1);
    }
    $scope.calculate2 = () => {
        let data = $scope.data.box2;
        let price = price2;
        $scope.calculate(data, price, $scope.discount2);
    }

    $scope.calculate = (data, price, discount) => {
        if(!data.count) {
            data.count = '';
        }
        let result = 0;
        
        for(var i = 1; i <= data.count; i++){
            if (i <= 100) {
                result += price[data.inch]['a'];
            } else if(i <= 120) {
                result += price[data.inch]['b'];
            }
            else if(i <= 140) {
                result += price[data.inch]['c'];
            }
            else if(i > 140) {
                result += price[data.inch]['d'];
            }
            // 원장, 부원장 옵션
            if(data.check3 == true) { result += price3['op3'] }
			// 실장 옵션
			if(data.check4 == true) { result += price3['op4'] }
        }

        // 옵션
        if(data.check1 == true) { result += price[data.inch]['op1'] }
        if(data.check2 == true) { 
			// 특수컬러 선택 시 100피스 이하는 피스당 +200원으로 계산
			if(data.count <= 100) {
				result += (data.count * 300)
			} else {
				result += price3['op2']	
			}			
		}      
        

        if(discount) {
            result = result / 100 * (100 - discount);
        }
        data.result = numberWithCommas(result);
    }
    

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    window.addEventListener("keydown", e => {
        if(e.key == 'q') {
            document.getElementById('box1_chk1').click();
        }
        if(e.key == 'w') {
            document.getElementById('box1_chk2').click();
        }
		if(e.key == 'e') {
            document.getElementById('box1_chk4').click();
        }
        if(e.key == 'r') {
            document.getElementById('box1_chk3').click();
        }
        if(e.key == 'a') {
            document.getElementById('box2_chk1').click();
        }
        if(e.key == 's') {
            document.getElementById('box2_chk4').click(); 
        }
		if(e.key == 'd') {
            document.getElementById('box2_chk2').click(); 
        }		
		if(e.keyCode == 27) {
			console.log(e.keyCode)
            $scope.reset1();
            $scope.reset2();
		}
		if(e.keyCode == 13) {
			console.log(e.keyCode)
            $scope.calculate1();
			$scope.calculate2();
        }
    });
	

    $scope.keyDown1 = (e) => {
        if(e.keyCode == 13) {
            $scope.calculate1();
			$scope.calculate2();
        }
		if(e.keyCode == 27) {
			$scope.reset1();
            $scope.reset2();
		}
    }
    $scope.keyDown2 = (e) => {
        if(e.keyCode == 13) {
            $scope.calculate1();
			$scope.calculate2();
        }
		if(e.keyCode == 27) {
			$scope.reset1();
            $scope.reset2();
		}
    }
	
	
}]);
