(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),l=t(14),u=t(2),i=function(e){var n=e.message;if(null===n)return null;var t={color:n.color||"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return r.a.createElement("div",{style:t},n.text)},d=function(e){var n=e.filterName,t=e.handleFilterNameChange;return r.a.createElement("div",null,"filter shown with:",r.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.newName,t=e.newNumber,a=e.handleNameChange,o=e.handleNumberChange,c=e.handleFormSubmit;return r.a.createElement("form",{onSubmit:c},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:n,onChange:a})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},f=function(e){var n=e.person,t=e.handleDeleteClick;return r.a.createElement("li",null,n.name," ",n.number,r.a.createElement("button",{onClick:t},"delete"))},s=function(e){var n=e.persons,t=e.deletePerson;return r.a.createElement("ul",null,n.map((function(e){return r.a.createElement(f,{key:e.id,person:e,handleDeleteClick:function(){return t(e)}})})))},h=t(3),b=t.n(h),g="api/persons",p=function(){return console.log("fetching data..."),b.a.get(g).then((function(e){return e.data}))},v=function(e){return console.log("creating data..."),b.a.post(g,e).then((function(e){return e.data}))},E=function(e,n){return console.log("updating data with id ".concat(e,"...")),b.a.put("".concat(g,"/").concat(e),n).then((function(e){return e.data}))},w=function(e){return console.log("deleting data with id ".concat(e,"...")),b.a.delete("".concat(g,"/").concat(e))},C=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),f=Object(u.a)(c,2),h=f[0],b=f[1],g=Object(a.useState)(""),C=Object(u.a)(g,2),N=C[0],j=C[1],O=Object(a.useState)(""),k=Object(u.a)(O,2),S=k[0],y=k[1],D=Object(a.useState)(null),F=Object(u.a)(D,2),x=F[0],P=F[1];Object(a.useEffect)((function(){p().then((function(e){o(e)}))}),[]),console.log("persons length: ",t.length);var A=function(e){var n=Object(l.a)({},e,{number:N});E(n.id,n).then((function(n){o(t.map((function(e){return e.id===n.id?n:e}))),b(""),j(""),P("Updated ".concat(e.name))})).catch((function(e){o(t.filter((function(e){return e.id!==n.id}))),B("Information of ".concat(n.name," has already been removed from server"),"red")}))},B=function(e,n){P({text:e,color:n}),setTimeout((function(){P(null)}),5e3)},I=t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(i,{message:x}),r.a.createElement(d,{filterName:S,handleFilterNameChange:function(e){var n=e.target.value;y(n)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(m,{newName:h,newNumber:N,handleNameChange:function(e){b(e.target.value)},handleNumberChange:function(e){j(e.target.value)},handleFormSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===h}));n?window.confirm("'".concat(h,"' is already added to phonebook, replace old number with a new one?"))&&A(n):v({name:h,number:N}).then((function(e){o(t.concat(e)),b(""),j(""),B("Added ".concat(e.name))})).catch((function(e){B(e.response.data.error,"red")}))}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(s,{persons:I,deletePerson:function(e){window.confirm("Delete ".concat(e.name,"?"))&&w(e.id).then((function(n){o(t.filter((function(n){return n.id!==e.id}))),B("Deleted ".concat(e.name))}))}}))};c.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.20c133ff.chunk.js.map