(this.webpackJsonplinkbook=this.webpackJsonplinkbook||[]).push([[5],{212:function(e,t,a){"use strict";a.d(t,"a",(function(){return X}));var n=a(12),o=a(19),c=a(114),i=a(196),s=a(68),r=a(185),l=a(221),d=a(184),m=a(209),u=a(229),h=a(188),p=a(193),j=a(207),b=a(180),f=a(197),g=a(205),v=a(195),O=a(228),x=a(18),y=a(217),k=a.n(y),w=a(218),S=a.n(w),E=a(219),R=a.n(E),I=a(220),C=a.n(I),L=a(0),N=a.n(L),T=a(181),M=a(81),P=a(82),z=a(84),F=a(83),V=a(87),D=a(33),B=a(2),_=function(e){Object(z.a)(a,e);var t=Object(F.a)(a);function a(){var e;Object(M.a)(this,a);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(e=t.call.apply(t,[this].concat(o))).state={user:null,isLoading:!0},e}return Object(P.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat(D.SERVER,"/users/avatar?userId=").concat(this.props.comment.userId),{method:"GET",credentials:"include"}).then((function(e){return e.json()})).then((function(t){t.success?e.setState({user:t,isLoading:!1}):e.setState({user:{login:null,avatar:null,userId:e.props.comment.userID},isLoading:!1})})).catch((function(t){e.setState({user:{login:null,avatar:null,userId:e.props.comment.userID},isLoading:!1})}))}},{key:"render",value:function(){return Object(B.jsx)(N.a.Fragment,{children:Object(B.jsxs)(h.a,{style:{display:"flex"},children:[this.state.isLoading?Object(B.jsx)(O.a,{animation:"wave",variant:"circle",width:40,height:40}):Object(B.jsx)(d.a,{component:x.b,to:"/users/".concat(this.state.user.login),"aria-label":"user profile",style:{padding:0,height:"max-content"},children:Object(B.jsx)(m.a,{"aria-label":"user avatar",src:this.state.user.avatar?"".concat(D.SERVER).concat(this.state.user.avatar):""})}),Object(B.jsxs)("div",{style:{marginLeft:16,flexGrow:1},children:[this.state.isLoading?Object(B.jsx)(O.a,{animation:"wave",height:10,width:"40%",style:{marginBottom:18}}):Object(B.jsxs)(s.a,{component:"p",children:[Object(B.jsx)(s.a,{variant:"subtitle2",component:x.b,to:"/users/".concat(this.state.user.login),color:"inherit",style:{textDecoration:"none"},children:this.state.user.login}),Object(B.jsx)(s.a,{component:"span",variant:"caption",style:{marginLeft:8},children:Object(V.a)(this.props.comment.created_at)})]}),this.state.isLoading?Object(B.jsx)(O.a,{animation:"wave",height:10,width:"80%",style:{marginBottom:12}}):Object(B.jsx)(s.a,{component:"p",variant:"body2",style:{marginTop:8},children:this.props.comment.value})]})]})})}}]),a}(L.Component),H=a(34),A=a(39),G=a(86),J=Object(T.a)((function(e){return{card:{borderRadius:10,margin:"auto",marginBottom:e.spacing(3)},cardContent:{paddingTop:0,paddingBottom:0},marginLeft:{marginLeft:e.spacing(2)},commentForm:{display:"flex",alignItems:"center"},commentAvatar:{marginRight:e.spacing(2)},progressbar:{position:"absolute",top:"50%",left:"50%",marginTop:-4,marginLeft:-12},noPadding:{padding:0},media:{paddingTop:"56.25%"}}}));function X(e){var t=J(),a=N.a.useState(!1),y=Object(o.a)(a,2),w=y[0],E=y[1],I=N.a.useState(!0),L=Object(o.a)(I,2),T=L[0],M=L[1],P=N.a.useContext(H.a).authDispatch,z=N.a.useState(e.post),F=Object(o.a)(z,2),V=F[0],X=F[1],q=N.a.useState({comment:""}),U=Object(o.a)(q,2),W=U[0],$=U[1],K=N.a.useState(),Q=Object(o.a)(K,2),Y=Q[0],Z=Q[1],ee=N.a.useState(null),te=Object(o.a)(ee,2),ae=te[0],ne=te[1],oe=N.a.useContext(G.a),ce=N.a.useState({comment:!1,delete:!1}),ie=Object(o.a)(ce,2),se=ie[0],re=ie[1],le=N.a.useState(!1),de=Object(o.a)(le,2),me=de[0],ue=de[1],he=Object(A.b)().enqueueSnackbar,pe=new Date(V.created_at).toDateString().split(" "),je=function(){ne(null)},be=Boolean(ae),fe="post-".concat(V.postId,"-menu"),ge=Object(B.jsxs)(c.a,{anchorEl:ae,anchorOrigin:{vertical:"top",horizontal:"left"},id:fe,keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:be,onClose:je,children:[Object(B.jsx)(i.a,{onClick:je,disabled:!0,children:"Save Post"}),Object(B.jsx)(i.a,{onClick:je,disabled:!0,children:"Report post"}),!T&&e.notSkeleton&&V.owner&&oe.userId===V.owner.userId&&Object(B.jsx)("div",{children:Object(B.jsx)(i.a,{onClick:function(){je(),function(){var e={postId:V.postId};window.confirm("Are you sure you want to delete post?")&&fetch("".concat(D.SERVER,"/posts/delete"),{method:"DELETE",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){e.success?(he("Post Deleted!",{variant:"success"}),P({type:"REFUSER"}),E(!0)):(he(e.message,{variant:"error"}),re({delete:!1}))})).catch((function(e){he("Post deletion failed!",{variant:"error"}),re({delete:!1}),console.error("Error:",e)}))}()},children:Object(B.jsx)(s.a,{color:"secondary",children:"Delete post"})})})]}),ve=function(){fetch("".concat(D.SERVER,"/posts/like?postId=").concat(V.postId),{method:"POST",credentials:"include"}).then((function(e){return e.json()})).then((function(e){e.success&&(e.success?(e.liked?X(Object(n.a)(Object(n.a)({},V),{},{likes:V.likes+1})):X(Object(n.a)(Object(n.a)({},V),{},{likes:V.likes-1})),Z(e.liked)):(401===e.status&&P({type:"logout"}),he(e.message,{variant:"error"})))})).catch((function(e){he("Failed to like post",{variant:"error"})}))};return N.a.useEffect((function(){e.notSkeleton&&V.postId&&fetch("".concat(D.SERVER,"/posts/like?postId=").concat(V.postId),{method:"GET",credentials:"include"}).then((function(e){return e.json()})).then((function(e){e.success&&Z(e.liked),M(!1)})).catch((function(e){M(!1)}))}),[Z,V.postId,e.notSkeleton]),Object(B.jsxs)(N.a.Fragment,{children:[!w&&Object(B.jsxs)(r.a,{className:t.card,variant:"outlined",children:[Object(B.jsx)(l.a,{avatar:!T&&e.notSkeleton?Object(B.jsx)(d.a,{component:x.b,to:"/users/".concat(V.owner.login),className:t.noPadding,"aria-label":"user profile",children:Object(B.jsx)(m.a,{"aria-label":"user avatar",alt:V.owner.login,src:V.owner.avatar?"".concat(D.SERVER).concat(V.owner.avatar):""})}):Object(B.jsx)(O.a,{animation:"wave",variant:"circle",width:40,height:40}),action:!T&&e.notSkeleton?Object(B.jsx)(d.a,{"aria-label":"Post options","aria-controls":fe,"aria-haspopup":"true",onClick:function(e){ne(e.currentTarget)},children:Object(B.jsx)(k.a,{})}):null,title:T?Object(B.jsx)(O.a,{animation:"wave",height:10,width:"80%",style:{marginBottom:6}}):Object(B.jsx)(s.a,{component:x.b,to:"/users/".concat(V.owner.login),color:"inherit",variant:"body2",style:{textDecoration:"none"},children:V.owner.login}),subheader:T?Object(B.jsx)(O.a,{animation:"wave",height:10,width:"40%"}):"".concat(pe[1]," ").concat(pe[2]," ").concat(pe[3])}),!T&&e.notSkeleton?V.postImage&&Object(B.jsx)(u.a,{style:{height:0,paddingTop:"56.25%"},image:"".concat(D.SERVER).concat(V.postImage),title:"".concat(V.owner.login,"'s post"),alt:V.postImage,to:"/posts/".concat(V.postId),component:e.single?h.a:x.b}):Object(B.jsx)(O.a,{animation:"wave",variant:"rect",className:t.media}),Object(B.jsx)(h.a,{children:!T&&e.notSkeleton?Object(B.jsx)(s.a,{component:"p",children:V.postText}):Object(B.jsxs)(N.a.Fragment,{children:[Object(B.jsx)(O.a,{animation:"wave",height:10,style:{marginBottom:6}}),Object(B.jsx)(O.a,{animation:"wave",height:10,width:"80%"})]})}),!T&&e.notSkeleton?Object(B.jsxs)(s.a,{className:t.marginLeft,variant:"subtitle2",component:"p",children:[V.likes," ",V.like>1?"Likes":"Like",Object(B.jsxs)(s.a,{component:"span",variant:"subtitle2",className:t.marginLeft,children:[V.comments," ",V.comments>1?"Comments":"Comment"]})]}):Object(B.jsx)(O.a,{animation:"wave",height:10,width:"50%",style:{marginLeft:16,marginBottom:11}}),Object(B.jsx)(p.a,{disableSpacing:!0,children:e.notSkeleton?Object(B.jsxs)(N.a.Fragment,{children:[Y?Object(B.jsx)(j.a,{title:"Unlike this",children:Object(B.jsx)(d.a,{"aria-label":"unlike",onClick:ve,color:"primary",children:Object(B.jsx)(S.a,{color:"inherit"})})}):Object(B.jsx)(j.a,{title:"Like this",children:Object(B.jsx)(d.a,{"aria-label":"like",onClick:ve,children:Object(B.jsx)(S.a,{})})}),Object(B.jsx)(j.a,{title:"Comments",children:Object(B.jsx)(d.a,{className:t.marginLeft,"aria-label":"comment",onClick:function(){ue(!me)},children:Object(B.jsx)(R.a,{})})})]}):Object(B.jsx)("div",{style:{height:36}})}),Object(B.jsxs)(b.a,{in:me,timeout:"auto",unmountOnExit:!0,children:[Object(B.jsx)(f.a,{}),Object(B.jsx)(h.a,{children:Object(B.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),W.comment){re({comment:!0});var t={postId:V.postId,value:W.comment};fetch("".concat(D.SERVER,"/posts/comment"),{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){if(e.success){$({comment:""}),he(e.message,{variant:"success"});var t=V.commentslist;t.unshift(e),X(Object(n.a)(Object(n.a)({},V),{},{comments:V.comments+1,commentslist:t}))}else 401===e.status&&P({type:"logout"}),he(e.message,{variant:"error"});re({comment:!1})})).catch((function(e){he("Failed to get post",{variant:"error"}),re({comment:!1}),console.error("Error:",e)}))}else he("Comment can't be empty",{variant:"warning"})},className:t.commentForm,children:[oe&&Object(B.jsx)(m.a,{src:oe.avatar?"".concat(D.SERVER).concat(oe.avatar):"",className:t.commentAvatar}),Object(B.jsx)(g.a,{id:"commentInput",label:"Write a comment...",onChange:function(e){$(Object(n.a)(Object(n.a)({},W),{},{comment:e.target.value}))},value:W.comment,fullWidth:!0}),Object(B.jsxs)("div",{style:{position:"relative"},children:[Object(B.jsx)(j.a,{title:"Add Comment",children:Object(B.jsx)(d.a,{"aria-label":"add comment",color:"primary",type:"submit",disabled:se.comment,children:Object(B.jsx)(C.a,{})})}),se.comment&&Object(B.jsx)(v.a,{size:24,className:t.progressbar})]})]})}),e.notSkeleton&&V.commentslist.map((function(e){return Object(B.jsx)(_,{comment:e},e.commentId)}))]})]}),ge]})}},217:function(e,t,a){"use strict";var n=a(22),o=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=o(a(0)),i=(0,n(a(24)).default)(c.createElement("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreVert");t.default=i},218:function(e,t,a){"use strict";var n=a(22),o=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=o(a(0)),i=(0,n(a(24)).default)(c.createElement("path",{d:"M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zm0 4l-3 7H9V9l4.34-4.34L12.23 10H21v2zM1 9h4v12H1z"}),"ThumbUpAltOutlined");t.default=i},219:function(e,t,a){"use strict";var n=a(22),o=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=o(a(0)),i=(0,n(a(24)).default)(c.createElement("path",{d:"M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM20 4v13.17L18.83 16H4V4h16zM6 12h12v2H6zm0-3h12v2H6zm0-3h12v2H6z"}),"CommentOutlined");t.default=i},220:function(e,t,a){"use strict";var n=a(22),o=a(23);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=o(a(0)),i=(0,n(a(24)).default)(c.createElement("path",{d:"M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"}),"Send");t.default=i},221:function(e,t,a){"use strict";var n=a(1),o=a(3),c=a(0),i=(a(5),a(4)),s=a(6),r=a(68),l=c.forwardRef((function(e,t){var a=e.action,s=e.avatar,l=e.classes,d=e.className,m=e.component,u=void 0===m?"div":m,h=e.disableTypography,p=void 0!==h&&h,j=e.subheader,b=e.subheaderTypographyProps,f=e.title,g=e.titleTypographyProps,v=Object(o.a)(e,["action","avatar","classes","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"]),O=f;null==O||O.type===r.a||p||(O=c.createElement(r.a,Object(n.a)({variant:s?"body2":"h5",className:l.title,component:"span",display:"block"},g),O));var x=j;return null==x||x.type===r.a||p||(x=c.createElement(r.a,Object(n.a)({variant:s?"body2":"body1",className:l.subheader,color:"textSecondary",component:"span",display:"block"},b),x)),c.createElement(u,Object(n.a)({className:Object(i.a)(l.root,d),ref:t},v),s&&c.createElement("div",{className:l.avatar},s),c.createElement("div",{className:l.content},O,x),a&&c.createElement("div",{className:l.action},a))}));t.a=Object(s.a)({root:{display:"flex",alignItems:"center",padding:16},avatar:{flex:"0 0 auto",marginRight:16},action:{flex:"0 0 auto",alignSelf:"flex-start",marginTop:-8,marginRight:-8},content:{flex:"1 1 auto"},title:{},subheader:{}},{name:"MuiCardHeader"})(l)},228:function(e,t,a){"use strict";var n=a(1),o=a(3),c=a(0),i=a(4),s=(a(5),a(16)),r=a(6),l=c.forwardRef((function(e,t){var a=e.animation,s=void 0===a?"pulse":a,r=e.classes,l=e.className,d=e.component,m=void 0===d?"span":d,u=e.height,h=e.variant,p=void 0===h?"text":h,j=e.width,b=Object(o.a)(e,["animation","classes","className","component","height","variant","width"]),f=Boolean(b.children);return c.createElement(m,Object(n.a)({ref:t,className:Object(i.a)(r.root,r[p],l,f&&[r.withChildren,!j&&r.fitContent,!u&&r.heightAuto],!1!==s&&r[s])},b,{style:Object(n.a)({width:j,height:u},b.style)}))}));t.a=Object(r.a)((function(e){return{root:{display:"block",backgroundColor:Object(s.c)(e.palette.text.primary,"light"===e.palette.type?.11:.13),height:"1.2em"},text:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 60%",transform:"scale(1, 0.60)",borderRadius:e.shape.borderRadius,"&:empty:before":{content:'"\\00a0"'}},rect:{},circle:{borderRadius:"50%"},pulse:{animation:"$pulse 1.5s ease-in-out 0.5s infinite"},"@keyframes pulse":{"0%":{opacity:1},"50%":{opacity:.4},"100%":{opacity:1}},wave:{position:"relative",overflow:"hidden","&::after":{animation:"$wave 1.6s linear 0.5s infinite",background:"linear-gradient(90deg, transparent, ".concat(e.palette.action.hover,", transparent)"),content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}},"@keyframes wave":{"0%":{transform:"translateX(-100%)"},"60%":{transform:"translateX(100%)"},"100%":{transform:"translateX(100%)"}},withChildren:{"& > *":{visibility:"hidden"}},fitContent:{maxWidth:"fit-content"},heightAuto:{height:"auto"}}}),{name:"MuiSkeleton"})(l)},229:function(e,t,a){"use strict";var n=a(1),o=a(3),c=a(0),i=(a(5),a(4)),s=a(6),r=["video","audio","picture","iframe","img"],l=c.forwardRef((function(e,t){var a=e.children,s=e.classes,l=e.className,d=e.component,m=void 0===d?"div":d,u=e.image,h=e.src,p=e.style,j=Object(o.a)(e,["children","classes","className","component","image","src","style"]),b=-1!==r.indexOf(m),f=!b&&u?Object(n.a)({backgroundImage:'url("'.concat(u,'")')},p):p;return c.createElement(m,Object(n.a)({className:Object(i.a)(s.root,l,b&&s.media,-1!=="picture img".indexOf(m)&&s.img),ref:t,style:f,src:b?u||h:void 0},j),a)}));t.a=Object(s.a)({root:{display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},media:{width:"100%"},img:{objectFit:"cover"}},{name:"MuiCardMedia"})(l)},241:function(e,t,a){"use strict";a.r(t);var n=a(19),o=a(0),c=a.n(o),i=a(15),s=a(212),r=a(33),l=a(39),d=a(68),m=a(2);t.default=function(){var e=Object(i.i)().postId,t=c.a.useState(),a=Object(n.a)(t,2),o=a[0],u=a[1],h=c.a.useState("Loading..."),p=Object(n.a)(h,2),j=p[0],b=p[1],f=Object(l.b)().enqueueSnackbar;return c.a.useEffect((function(){fetch("".concat(r.SERVER,"/posts/byid?postId=").concat(e),{method:"GET",credentials:"include"}).then((function(e){return e.json()})).then((function(e){e.success?u(e.post):(u(),b("Request post is either deleted or post id is wrong"),f(e.message,{variant:"error"}))})).catch((function(e){u(),b("Failed to get post"),f("Failed to get post",{variant:"error"}),console.error("Error:",e)}))}),[e,f]),Object(m.jsx)(m.Fragment,{children:o?Object(m.jsx)(s.a,{post:o,notSkeleton:!0,single:!0}):Object(m.jsx)(d.a,{variant:"subtitle1",color:"inherit",children:j})})}}}]);
//# sourceMappingURL=5.7cc7dc5b.chunk.js.map