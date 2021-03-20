window.addEventListener('load',function() {
    // 实现网页轮播图
		var arrow=document.querySelector('.arrow');
		var cen_left=document.querySelector('.cen_left');
		cen_left.addEventListener('mouseenter',function() {
            arrow.style.display='block';
            clearInterval(timer);//关闭定时器
            timer=null;//清除定时器对象
		})
		cen_left.addEventListener('mouseleave',function() {
            arrow.style.display='none';
            timer=setInterval(function(){
                // 调用自动点击右箭头事件
                arrow_r.click();
            },1500)//打开定时器
		})
		var circle=document.querySelector('.circle');
		var ul=cen_left.querySelector('ul');
		// 动态生成小圆圈  有几张图片，我就生成几个小圆圈
		for(var i=0;i<ul.children.length;i++) {
			 // 创建一个小li 
			 var li=document.createElement('li');
			// 记录当前小圆圈的索引号 通过自定义属性来做
			li.setAttribute('index', i);
			// 把小li插入到circle 里面
			circle.appendChild(li); 
			// 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        	li.addEventListener('click',function() {
            // 干掉所有人 把所有的小li 清除 current 类名
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'current';
             // 当我们点击了某个小li 就拿到当前小li 的索引号
             var index = this.getAttribute('index');
             num=index;//解决按钮和点击小圆圈切换图片不同步的问题
             n=index;//解决按钮和小圆圈切换不同步的问题
            animate(ul,-index * cen_left.offsetWidth)
            })
        }
        // 把circle里面的第一个小li设置类名为 current
        circle.children[0].className = 'current';
        // 实现点击左右箭头切换图片
        var num=0;
        var arrow_l=document.querySelector('.arrow-l');
        var arrow_r=document.querySelector('.arrow-r');
        // 右箭头
        // 节流阀实现
        var flag=true;
        arrow_r.addEventListener('click',function() {
                if(flag) {
                    flag=false;//先关闭节流阀
                if(num==ul.children.length-1) {
                    ul.style.left=0;
                    num=0;
                }
                    num++;
                    animate(ul,-num*cen_left.offsetWidth,function() {
                        flag=true;//动画执行完毕执行回调函数，打开节流阀
                    });
                //上述做法也可做到无缝循环滚动，但是要手动复制第一章图片到最后一张，我们可以采用js代码自动复制
                // 即滚到最后一张图片时候，将最前面的那张自动克隆到最后面即可
                n++;
                // if(n==ul.children.length-1) {
                //     n=0;
                // }
                n=(n==ul.children.length-1)?0:n;
                circleChange();
            }
        })
        
        // 克隆实现采用cloneNode(true)深克隆，即将内部的子节点也克隆过来
        var first=ul.children[0].cloneNode(true);
        ul.appendChild(first);
        // 声明变量n使得图片切换的同时小圆点也要跟着移动
        var n=0;
        // 左箭头
        arrow_l.addEventListener('click',function() {
            if(flag) {
                flag=false;
                if(num==0) {
                    num=ul.children.length-1;
                    ul.style.left=-num*cen_left.offsetWidth+'px';
                    
                }
                    num--;
                    animate(ul,-num*cen_left.offsetWidth,function() {
                        flag=true;
                    });
                //上述做法也可做到无缝循环滚动，但是要手动复制第一章图片到最后一张，我们可以采用js代码自动复制
                // 即滚到最后一张图片时候，将最前面的那张自动克隆到最后面即可
                // animate(ul,-num*cen_left.offsetWidth);
                n--;
                n=(n<0)?circle.children.length-1:n;
                circleChange();
            } 
        })
        
            
        // 切换小圆点的代码相同，可封装函数
        function circleChange() {
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            circle.children[n].className='current';
        }
        // 采用定时器自动切换图片(还需要设置鼠标经过图片停止定时器，鼠标离开打开定时器)
        var timer=setInterval(function(){
            // 调用自动点击右箭头事件
            arrow_r.click();
        },1500)

        
})