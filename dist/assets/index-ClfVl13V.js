(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const g=[{id:1,name:"Skate Completo Pro",price:499.99,image:"https://via.placeholder.com/300x200",category:"completos"},{id:2,name:"Shape Element 8.0",price:249.99,image:"https://via.placeholder.com/300x200",category:"shapes"},{id:3,name:"Rolamento Bones Reds",price:149.99,image:"https://via.placeholder.com/300x200",category:"rolamentos"},{id:4,name:"Truck Independent 139mm",price:399.99,image:"https://via.placeholder.com/300x200",category:"trucks"},{id:5,name:"Roda Spitfire 53mm",price:199.99,image:"https://via.placeholder.com/300x200",category:"rodas"},{id:6,name:"Kit Amortecedores Independent",price:59.99,image:"https://via.placeholder.com/300x200",category:"amortecedores"},{id:7,name:"Parafuso de Base Black Sheep",price:29.99,image:"https://via.placeholder.com/300x200",category:"parafusos"},{id:8,name:"Boné Thrasher Preto",price:129.99,image:"https://via.placeholder.com/300x200",category:"bones"},{id:9,name:"Camiseta Santa Cruz",price:89.99,image:"https://via.placeholder.com/300x200",category:"camisetas"},{id:10,name:"Lixa Grizzly",price:49.99,image:"https://via.placeholder.com/300x200",category:"acessorios"}];class f{constructor(){this.items=[]}addItem(e){const a=this.items.find(o=>o.id===e.id);a?a.quantity+=1:this.items.push({...e,quantity:1})}removeItem(e){this.items=this.items.filter(a=>a.id!==e)}getTotal(){return this.items.reduce((e,a)=>e+a.price*a.quantity,0)}getItemsCount(){return this.items.reduce((e,a)=>e+a.quantity,0)}clear(){this.items=[]}}function v(t,e){const a="5591982066009";let o=`🛍️ *Novo Pedido - Skate Shop* 🛹

`;o+=`*Produtos Selecionados:*
`,t.forEach((s,y)=>{o+=`
${y+1}. *${s.name}*
`,o+=`   • Quantidade: ${s.quantity}
`,o+=`   • Preço unitário: R$ ${s.price.toFixed(2)}
`,o+=`   • Subtotal: R$ ${(s.price*s.quantity).toFixed(2)}
`}),o+=`
💰 *Total do Pedido: R$ ${e.toFixed(2)}*

`,o+=`✨ *Informações Adicionais:*
`,o+="Olá! Tenho interesse nos produtos acima. ",o+=`Gostaria de saber sobre:
`,o+=`• Formas de pagamento disponíveis
`,o+=`• Prazo de entrega para minha região
`,o+=`• Se há disponibilidade imediata

`,o+="Aguardo retorno! 🏂";const n=encodeURIComponent(o),r=`https://wa.me/${a}?text=${n}`;window.open(r,"_blank")}const i=new f,p=document.getElementById("cartModal"),I=document.getElementById("cartIcon"),C=document.getElementById("closeCart"),E=document.getElementById("products"),$=document.getElementById("cartItems"),x=document.getElementById("cartCount"),w=document.getElementById("cartTotal"),L=document.getElementById("sendToWhatsApp"),l=document.getElementById("searchInput"),b=document.getElementById("searchButton"),h=document.querySelectorAll(".categories-nav a"),B=document.getElementById("supportWhatsApp");let m="all",u="";function P(){return g.filter(t=>{const e=m==="all"||t.category===m,a=t.name.toLowerCase().includes(u.toLowerCase());return e&&a})}function c(){x.textContent=i.getItemsCount(),w.textContent=i.getTotal().toFixed(2),$.innerHTML=i.items.map(t=>`
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-title">${t.name}</div>
                <div class="cart-item-price">
                    R$ ${t.price.toFixed(2)} x ${t.quantity}
                </div>
            </div>
            <button class="remove-item" onclick="window.removeFromCart(${t.id})">
                ❌
            </button>
        </div>
    `).join("")}function d(){const t=P();E.innerHTML=t.map(e=>`
        <div class="product-card">
            <img src="${e.image}" alt="${e.name}" class="product-image">
            <h3 class="product-title">${e.name}</h3>
            <p class="product-price">R$ ${e.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="window.addToCart(${e.id})">
                <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
            </button>
        </div>
    `).join("")}window.addToCart=t=>{const e=g.find(a=>a.id===t);e&&(i.addItem(e),c())};window.removeFromCart=t=>{i.removeItem(t),c()};I.addEventListener("click",()=>{p.style.display="block"});C.addEventListener("click",()=>{p.style.display="none"});L.addEventListener("click",()=>{i.items.length>0&&(v(i.items,i.getTotal()),i.clear(),c(),p.style.display="none")});b.addEventListener("click",()=>{u=l.value,d()});l.addEventListener("keypress",t=>{t.key==="Enter"&&(u=l.value,d())});h.forEach(t=>{t.addEventListener("click",e=>{e.preventDefault(),h.forEach(a=>a.classList.remove("active")),t.classList.add("active"),m=t.dataset.category,d()})});B.addEventListener("click",t=>{t.preventDefault();const o=`https://wa.me/5591982066009?text=${encodeURIComponent("Olá! Preciso de ajuda com a loja virtual.")}`;window.open(o,"_blank")});d();c();
