"use strict";(self.webpackChunktrainee_heroes_app=self.webpackChunktrainee_heroes_app||[]).push([[498],{6498:(L,l,r)=>{r.r(l),r.d(l,{LoginModule:()=>b});var d=r(9808),e=r(3075);class g{constructor(s,i,o){this.username=s,this.email=i,this.password=o}}var m=r(6778),t=r(5e3),h=r(485),c=r(6696),p=r(7423);function f(n,s){1&n&&(t.TgZ(0,"span"),t._uU(1," user name,"),t.qZA())}function v(n,s){1&n&&(t.TgZ(0,"div",3)(1,"label",10),t._uU(2,"User name"),t.qZA(),t._UZ(3,"input",11),t.qZA())}let w=(()=>{class n{constructor(i,o,a){this.loginService=i,this.router=o,this.fb=a,this.mode="login",this.authForm=this.fb.group({username:["","newAccount"===this.mode?[e.kI.required,e.kI.minLength(8),e.kI.pattern(m.X8)]:null],email:["",[e.kI.required,e.kI.email,e.kI.pattern(m.s9)]],password:["",[e.kI.required,e.kI.minLength(5),e.kI.pattern(m.lI)]]})}onCreateNewAccount(){this.switchMode()}switchMode(){if("login"===this.mode)return this.mode="newAccount",void this.authForm.get("username").setValidators([e.kI.required,e.kI.minLength(8),e.kI.pattern(m.X8)]);this.mode="login",this.authForm.get("username").clearValidators(),this.authForm.get("username").reset()}onSubmit(){const i=this.authForm.get("username").value,o=this.authForm.get("email").value,a=this.authForm.get("password").value;let u=!1;if("login"===this.mode&&(u=this.loginService.login(o,a)),"newAccount"===this.mode){const I=new g(i,o,a);u=this.loginService.addUser(I)}this.authForm.reset(),u&&"login"===this.mode?this.router.navigate(["select"]):u&&"newAccount"===this.mode&&this.switchMode()}}return n.\u0275fac=function(i){return new(i||n)(t.Y36(h.r),t.Y36(c.F0),t.Y36(e.qu))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-login"]],decls:18,vars:6,consts:[[1,"form",3,"formGroup","ngSubmit"],[4,"ngIf"],["class","mb-3",4,"ngIf"],[1,"mb-3"],["for","email",1,"form-label"],["formControlName","email","name","email","id","email","type","email",1,"form-control"],["for","password",1,"form-label"],["formControlName","password","name","password","id","password","type","password",1,"form-control"],["mat-flat-button","","color","primary",3,"disabled"],["mat-stroked-button","","type","button",3,"click"],["for","username",1,"form-label"],["formControlName","username","name","username","id","username","type","text",1,"form-control"]],template:function(i,o){1&i&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t.TgZ(1,"h4"),t._uU(2,"Please enter your"),t.YNc(3,f,2,0,"span",1),t._uU(4," email and password"),t.qZA(),t.YNc(5,v,4,0,"div",2),t.TgZ(6,"div",3)(7,"label",4),t._uU(8,"Email"),t.qZA(),t._UZ(9,"input",5),t.qZA(),t.TgZ(10,"div",3)(11,"label",6),t._uU(12,"Password"),t.qZA(),t._UZ(13,"input",7),t.qZA(),t.TgZ(14,"button",8),t._uU(15),t.qZA(),t.TgZ(16,"button",9),t.NdJ("click",function(){return o.onCreateNewAccount()}),t._uU(17),t.qZA()()),2&i&&(t.Q6J("formGroup",o.authForm),t.xp6(3),t.Q6J("ngIf","newAccount"===o.mode),t.xp6(2),t.Q6J("ngIf","newAccount"===o.mode),t.xp6(9),t.Q6J("disabled",o.authForm.invalid),t.xp6(1),t.hij(" ","login"===o.mode?"Sign in":"Sign up"," "),t.xp6(2),t.hij(" ","login"===o.mode?"Create new account":"Switch to login"," "))},directives:[e._Y,e.JL,e.sg,d.O5,e.Fj,e.JJ,e.u,p.lW],styles:[".form[_ngcontent-%COMP%]{border:1px solid gray;border-radius:5px;padding:25px;min-width:150px;max-width:500px;width:100%;margin:50px auto}.full-width[_ngcontent-%COMP%]{width:100%}input.ng-invalid.ng-dirty.ng-touched[_ngcontent-%COMP%]{border:1px solid red}td[_ngcontent-%COMP%]{padding-right:8px}button[_ngcontent-%COMP%]{margin-right:5px}"],changeDetection:0}),n})();var C=r(683);const Z=[{path:"",component:w,canActivate:[r(8108).A]}];let b=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[d.ez,e.UX,C.q,c.Bz.forChild(Z)]]}),n})()}}]);