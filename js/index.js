/**
 * Created by wyf on 2018/4/13.
 */
(function() {
  // 信号灯组件
  Vue.component("lamp-integer", {
    template: '<div v-bind:class="[lampClass, status]"><div class="four" v-show="lamp[3]"></div><div class="three" v-show="lamp[2]"></div><div class="two" v-show="lamp[1]"></div><div class="one" v-show="lamp[0]"></div></div>',
    props: {
      status: {
        type: String,
      },
    },
    data: function() {
      return {
        lamp: [true, false, false, false],
        COUNT: 0,
        lampClass: "lamp",
        timer: null
      };
    },
    watch: {
    },
    mounted: function() {
      this.lampAnimation();
    },
    beforeDestroy: function() {
      clearTimeout(this.timer)
    },
    methods: {
      lampAnimation: function() {
        if (this.COUNT > 3) {
          this.COUNT = 0;
          this.lamp = this.lamp.map(function () {
            return false
          })
          this.lamp[0] = true
        }
        this.lamp = this.lamp.concat()// 更换原型指针，触发更新
        this.lamp[this.COUNT] = true
        this.COUNT++
        var vm = this;
        // requestAnimationFrame(vm.lampAnimation)
        this.timer = setTimeout(function() {
          vm.lampAnimation();
        }, 200);
      }
    }
  });
// 渲染vm， 数据交互可在此完成
  var app = new Vue({
    el: "#app",
    data: {
      time: "10:23:55",
      title: "广发证券交易运行状态全景实时展示",
      title2: "核心交易后台",
      loading: true,
      circles: [false, false, false, false], // 控制数据库外围圆圈显隐
      COUNT: 0,
      lampStatus: {// 控制信号灯状态
        status_kxc_01: "error",
        status_kxc_02: "normal",
        status_kxc_03: "normal",
        status_sh_01: "normal",
        status_sh_02: "warning",
        status_sh_03: "normal",
        status_mc_01: "ban",
        status_mc_02: "normal",
        status_mc_03: "normal",
      },
      timer: null,
      timer2: null,
    },
    methods: {
      date: function () {// 显示当前时间
        var vm = this;
        var date = new Date();
        var h = (date.getHours() + 100).toString().slice(1);
        var m = (date.getMinutes() + 100).toString().slice(1);
        var s = (date.getSeconds() + 100).toString().slice(1);
        this.time= h + ':' + m + ':' + s;
        this.timer = setTimeout(function() {
          vm.date();
        }, 1000)
      },
      circleAnimate: function () {
        this.circles[this.COUNT] = true
        this.COUNT++
        if (this.COUNT > 4) {
          this.COUNT = 0;
          this.circles = this.circles.map(function () {
            return false
          })
        }
        this.circles = this.circles.concat()// 更换原型指针，触发更新
        var vm = this;
        this.timer2 = setTimeout(function() {
          vm.circleAnimate();
        }, 500);
      }
    },
    mounted: function() {
      this.date();
      this.circleAnimate();
      this.loading = false;
    },
    beforeDestroy: function() {
      clearTimeout(this.timer);
      clearTimeout(this.timer2);
    }
  });
})(Vue);
