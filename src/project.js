require=function o(t,e,n){function i(c,s){if(!e[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(r)return r(c,!0);var h=new Error("Cannot find module '"+c+"'");throw h.code="MODULE_NOT_FOUND",h}var d=e[c]={exports:{}};t[c][0].call(d.exports,function(o){var e=t[c][1][o];return i(e?e:o)},d,d.exports,o,t,e,n)}return e[c].exports}for(var r="function"==typeof require&&require,c=0;c<n.length;c++)i(n[c]);return i}({"boom-control":[function(o,t,e){"use strict";cc._RFpush(t,"43291ejLNZBZa4lLl0tdTiw","boom-control"),cc.Class({"extends":cc.Component,properties:{_dropTimeStamp:null,restDuration:3,_booming:!1,_powerHandler:{get:function(){return this.node.getChildByName("power-handler")}},boomDuration:.2,power:3,_state:null,_boomMap:null,_gridControl:null},init:function(){this._boomMap=o("boom-map"),this._gridControl=o("grid-control"),this.node.on("time-stamp-sync",this.onTimeStampSync,this);var t=!0,e=!1,n=void 0;try{for(var i,r=this._powerHandler.children[Symbol.iterator]();!(t=(i=r.next()).done);t=!0){var c=i.value;c.scaleX=this.power+.4}}catch(s){e=!0,n=s}finally{try{!t&&r["return"]&&r["return"]()}finally{if(e)throw n}}this._dropTimeStamp=Date.now(),this._state="power-init",this._powerHandler.active=!0,this.scheduleOnce(function(){this._powerHandler.active=!1,this.scheduleOnce(function(){this._state="time-stamp-init",this._powerHandler.active=!0}.bind(this),0)}.bind(this),0)},onTimeStampSync:function(o){var t=this._dropTimeStamp,e=o.detail;e<t&&(this._dropTimeStamp=e,this.node.emit("time-stamp-sync",e))},boom:function(){this._state="booming",this.node.emit("boom"),this.scheduleOnce(function(){this._boomMap.unsetBoom(this._gridControl.getGrid(this.node.position)),this.node.removeFromParent()}.bind(this),this.boomDuration)},update:function(){this._dropTimeStamp+1e3*this.restDuration<=Date.now()&&(this._booming||(this._booming=!0,this.boom()))}}),cc._RFpop()},{"boom-map":"boom-map","grid-control":"grid-control"}],"boom-drop-control":[function(o,t,e){"use strict";cc._RFpush(t,"c40e18bGMpD0ZiZhp9KmDi6","boom-drop-control"),cc.Class({"extends":cc.Component,properties:{boomPrefabArray:[cc.Prefab],groundPanel:cc.Node,_gridControl:null,_boomMap:null},onLoad:function(){cc.systemEvent.on("keydown",this.onKeyDown,this),this._gridControl=o("grid-control"),this._boomMap=o("boom-map")},onKeyDown:function(o){o.keyCode==cc.KEY.space&&this.dropBoom()},dropBoom:function(){var o=this._gridControl.getGrid(this.node.position);if(!this._boomMap.isBoomSet(o)){this._boomMap.setBoom(o);var t=Math.floor(Math.random()*this.boomPrefabArray.length),e=cc.instantiate(this.boomPrefabArray[t]);this.groundPanel.addChild(e),e.position=this._gridControl.getGridPosition(this.node.position),e.getComponent("boom-control").init(),e.zIndex=this.node.zIndex-1}}}),cc._RFpop()},{"boom-map":"boom-map","grid-control":"grid-control"}],"boom-map":[function(o,t,e){"use strict";cc._RFpush(t,"12283UI1mNENIOYuouLTmCG","boom-map");var n=[];t.exports={isBoomSet:function(o){var t=o.x+"#"+o.y;return void 0!=n[t]},unsetBoom:function(o){var t=o.x+"#"+o.y;n[t]=void 0},setBoom:function(o){var t=o.x+"#"+o.y;n[t]="set"}},cc._RFpop()},{}],"enemy-generator":[function(o,t,e){"use strict";cc._RFpush(t,"a42f7ruQo9L2IDUj9rBkf/I","enemy-generator"),cc.Class({"extends":cc.Component,properties:{enemyPrefabArray:[cc.Prefab],time:10,num:1,_currentTime:1,ground:cc.Node,_sceneLoading:!1},onLoad:function(){window.enemyNum=0,this.schedule(this.generator.bind(this),1)},generator:function(){if(0==window.enemyNum){if(this._currentTime==this.time&&!this._sceneLoading)return this._sceneLoading=!0,void cc.director.loadScene("win-scene");for(var o=this.num*this._currentTime,t=0;t<o;t++){var e=Math.floor(Math.random()*this.enemyPrefabArray.length),n=cc.instantiate(this.enemyPrefabArray[e]),i=null;i=Math.random()>.5?cc.v2(Math.round(960*cc.random0To1()),640*cc.random0To1()):cc.v2(960*cc.random0To1(),640*Math.round(cc.random0To1())),this.ground.addChild(n),n.name="enemy"+Date.now(),n.position=i,window.enemyNum++}this._currentTime++}}}),cc._RFpop()},{}],"grid-control":[function(o,t,e){"use strict";cc._RFpush(t,"ba0f95wOGFOc7EWaHLN9+Sn","grid-control");var n=50,i=function(o){return cc.v2(Math.round(o.x/n),Math.round(o.y/n))},r=function(o){return cc.pMult(i(o),n)};t.exports={getGrid:i,getGridPosition:r},cc._RFpop()},{}],"move-control":[function(o,t,e){"use strict";cc._RFpush(t,"a8a55hRY49K4rNKDkt3X7Yq","move-control"),cc.Class({"extends":cc.Component,properties:{_left:!1,_right:!1,_up:!1,_down:!1,moveSpeed:0,_leftBlock:0,_rightBlock:0,_upBlock:0,_downBlock:0,realPlayer:!1,_player:null},onLoad:function(){this.realPlayer?(cc.systemEvent.on("keydown",this.onKeyDown,this),cc.systemEvent.on("keyup",this.onKeyUp,this)):this._player=this.node.parent.getChildByName("player");var o=cc.director.getCollisionManager();o.enabled=!0},onCollisionEnter:function(o,t){"static-wall"!=o.node.group&&"boom"!=o.node.group||this.onTouchWall(o,t)},onCollisionExit:function(o,t){"static-wall"!=o.node.group&&"boom"!=o.node.group||this.onLeaveWall(o,t)},onTouchWall:function(o,t){var e=[],n=t.world.aabb,i=o.world.aabb,r=t.world.preAabb;o.world.preAabb;if(r.xMin>=i.xMax&&n.xMin<=i.xMax){var c=Math.abs(i.xMax-r.xMin);e.push({distance:c,direction:"left"})}if(r.xMax<=i.xMin&&n.xMax>=i.xMin){var s=Math.abs(i.xMin-r.xMax);e.push({distance:s,direction:"right"})}if(r.yMax<=i.yMin&&n.yMax>=i.yMin){var a=Math.abs(i.yMin-r.yMax);e.push({distance:a,direction:"up"})}if(r.yMin>=i.yMax&&n.yMin<=i.yMax){var h=Math.abs(i.yMax-r.yMin);e.push({distance:h,direction:"down"})}void 0==o.blockArray&&(o.blockArray={}),o.blockArray[t.node.name]=e;var d=!0,l=!1,p=void 0;try{for(var m,u=e[Symbol.iterator]();!(d=(m=u.next()).done);d=!0){var y=m.value,_="_"+y.direction+"Block";this[_]+=1}}catch(g){l=!0,p=g}finally{try{!d&&u["return"]&&u["return"]()}finally{if(l)throw p}}},onLeaveWall:function(o,t){if(void 0!==o.blockArray&&void 0!==o.blockArray[t.node.name]){var e=!0,n=!1,i=void 0;try{for(var r,c=o.blockArray[t.node.name][Symbol.iterator]();!(e=(r=c.next()).done);e=!0){var s=r.value,a="_"+s.direction+"Block";this[a]-=1}}catch(h){n=!0,i=h}finally{try{!e&&c["return"]&&c["return"]()}finally{if(n)throw i}}o.blockArray[t.node.name]=[]}},onKeyDown:function(o){switch(o.keyCode){case cc.KEY.up:this._up=!0;break;case cc.KEY.down:this._down=!0;break;case cc.KEY.left:this._left=!0,this.node.scaleX=-1,this.node.children[0].scaleX=-1;break;case cc.KEY.right:this._right=!0,this.node.scaleX=1,this.node.children[0].scaleX=1}},onKeyUp:function(o){switch(o.keyCode){case cc.KEY.up:this._up=!1;break;case cc.KEY.down:this._down=!1;break;case cc.KEY.left:this._left=!1;break;case cc.KEY.right:this._right=!1}},update:function(o){if(this.realPlayer)this._left&&!this._leftBlock&&(this.node.x-=this.moveSpeed),this._right&&!this._rightBlock&&(this.node.x+=this.moveSpeed),this._up&&!this._upBlock&&(this.node.y+=this.moveSpeed),this._down&&!this._downBlock&&(this.node.y-=this.moveSpeed);else{var t=cc.pSub(this._player.position,this.node.position),e=cc.pMult(cc.pNormalize(t),this.moveSpeed);e.x>0&&this._rightBlock&&(e.x=0),e.x<0&&this._leftBlock&&(e.x=0),e.y>0&&this._upBlock&&(e.y=0),e.y<0&&this._downBlock&&(e.y=0),e.x>0&&(this.node.scaleX=1,this.node.children[0].scaleX=1),e.x<0&&(this.node.scaleX=-1,this.node.children[0].scaleX=-1),this.node.position=cc.pAdd(this.node.position,e)}}}),cc._RFpop()},{}],"player-control":[function(o,t,e){"use strict";cc._RFpush(t,"a2a3ex3TD1Cr7IOqbgRqb5+","player-control"),cc.Class({"extends":cc.Component,properties:{hp:100,realPlayer:!1,hurtValue:5,_hpLabel:{get:function(){return this.node.getChildByName("hp-tips").getComponent(cc.Label)}},_sceneLoading:!1,hurtDurationOfEnemyTouch:.5,_hurtTimeStamp:null,_enemyRemoving:!1,_gridControl:null},onLoad:function(){this._gridControl=o("grid-control"),this._hurtTimeStamp=Date.now(),this._hpLabel.string=this.hp,this.node.on("hurt-by-power",this.onHurt,this);var t=cc.director.getCollisionManager();t.enabled=!0},onCollisionStay:function(o,t){this.realPlayer&&"player"==o.node.group&&this.checkGridTouch(o.node,t.node)&&this._hurtTimeStamp+1e3*this.hurtDurationOfEnemyTouch<=Date.now()&&(this.onHurt(),this._hurtTimeStamp=Date.now())},checkGridTouch:function(o,t){var e=this._gridControl.getGrid(o.position),n=this._gridControl.getGrid(t.position);return e.x==n.x&&e.y==n.y},onHurt:function(){this.hp-=this.hurtValue,this.hp<=0?this.realPlayer?this._sceneLoading||(this._sceneLoading=!0,cc.director.loadScene("game-over-scene")):this._enemyRemoving||(this._enemyRemoving=!0,window.enemyNum--,this.node.removeFromParent()):this._hpLabel.string=this.hp}}),cc._RFpop()},{"grid-control":"grid-control"}],"power-control":[function(o,t,e){"use strict";cc._RFpush(t,"ed193AeDlREYq8E/WQbkEFQ","power-control"),cc.Class({"extends":cc.Component,properties:{boomControl:o("boom-control"),_gridControl:null,_preBoomArray:[]},onLoad:function(){var t=cc.director.getCollisionManager();t.enabled=!0,this._gridControl=o("grid-control"),this.boomControl.node.on("boom",this.onBoom,this)},onBoom:function(){this.getComponent(cc.Sprite).enabled=!0;for(var o in this._preBoomArray)this.checkGrid(this._preBoomArray[o])&&this._preBoomArray[o].emit("hurt-by-power")},onCollisionEnter:function(o,t){var e=this.boomControl._state;if("static-wall"==o.node.group&&"power-init"==e){var n=this._gridControl.getGrid(o.node.position),i=this._gridControl.getGrid(this.boomControl.node.position),r=Math.abs(n.x-i.x)+Math.abs(n.y-i.y);r<=this.node.scaleX&&(this.node.scaleX=r-.6)}else"boom"==o.node.group&&"time-stamp-init"==e?o.node.emit("time-stamp-sync",this.boomControl._dropTimeStamp):"player"==o.node.group&&"time-stamp-init"==e?(o.preBoomIndex=o.node.name,this._preBoomArray[o.preBoomIndex]=o.node):"player"==o.node.group&&"booming"==e&&this.checkGrid(o.node)&&o.node.emit("hurt-by-power")},checkGrid:function(o){var t=this._gridControl.getGrid(o.position),e=this._gridControl.getGrid(this.boomControl.node.position);return t.x==e.x||t.x==e.y||t.y==e.x||t.y==e.y},onCollisionExit:function(o,t){var e=this.boomControl._state;"player"==o.node.group&&"time-stamp-init"==e&&void 0!=o.preBoomIndex&&delete this._preBoomArray[o.preBoomIndex]}}),cc._RFpop()},{"boom-control":"boom-control","grid-control":"grid-control"}],"restart-script":[function(o,t,e){"use strict";cc._RFpush(t,"d528582PatONZWwDgBdwAse","restart-script"),cc.Class({"extends":cc.Component,properties:{_sceneLoading:!1},onLoad:function(){this.node.on("touchstart",function(){this._sceneLoading||(this._sceneLoading=!0,cc.director.loadScene("main-scene"))},this)}}),cc._RFpop()},{}]},{},["boom-control","boom-drop-control","boom-map","enemy-generator","grid-control","move-control","player-control","power-control","restart-script"]);