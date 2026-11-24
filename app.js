const categories = [
  {name:"सब्जियाँ",icon:"🥦"},{name:"फल",icon:"🍎"},{name:"फूल",icon:"🌸"},
  {name:"अनाज",icon:"🌾"},{name:"चावल",icon:"🍚"},{name:"दाल",icon:"🫘"},
  {name:"मसाले",icon:"🌶️"},{name:"तेल",icon:"🛢️"},{name:"दूध और डेयरी",icon:"🥛"},
  {name:"किराना",icon:"🛒"}
];
const sampleProducts = [
 {id:"p1",name:"ताज़ा टमाटर",category:"सब्जियाँ",price:30,unit:"किलो",seller:"स्थानीय किसान",city:"भारत",emoji:"🍅",description:"ताज़े और लाल टमाटर"},
 {id:"p2",name:"आलू",category:"सब्जियाँ",price:25,unit:"किलो",seller:"किसान विक्रेता",city:"भारत",emoji:"🥔",description:"रोज़मर्रा के उपयोग के लिए"},
 {id:"p3",name:"हरी मिर्च",category:"सब्जियाँ",price:40,unit:"किलो",seller:"किसान विक्रेता",city:"भारत",emoji:"🌶️",description:"ताज़ी हरी मिर्च"},
 {id:"p4",name:"केला",category:"फल",price:50,unit:"दर्जन",seller:"फल उत्पादक",city:"भारत",emoji:"🍌",description:"पके और ताज़े केले"},
 {id:"p5",name:"सेब",category:"फल",price:140,unit:"किलो",seller:"फल विक्रेता",city:"भारत",emoji:"🍎",description:"चुनिंदा सेब"},
 {id:"p6",name:"गेंदा फूल",category:"फूल",price:60,unit:"किलो",seller:"फूल उत्पादक",city:"भारत",emoji:"🌼",description:"ताज़े पीले-नारंगी फूल"},
 {id:"p7",name:"गेहूँ",category:"अनाज",price:28,unit:"किलो",seller:"किसान विक्रेता",city:"भारत",emoji:"🌾",description:"साफ गेहूँ"},
 {id:"p8",name:"बासमती चावल",category:"चावल",price:95,unit:"किलो",seller:"अनाज विक्रेता",city:"भारत",emoji:"🍚",description:"खुशबूदार चावल"},
 {id:"p9",name:"अरहर दाल",category:"दाल",price:125,unit:"किलो",seller:"किराना विक्रेता",city:"भारत",emoji:"🫘",description:"साफ अरहर दाल"},
 {id:"p10",name:"हल्दी पाउडर",category:"मसाले",price:180,unit:"किलो",seller:"मसाला विक्रेता",city:"भारत",emoji:"🟡",description:"पीसी हुई हल्दी"},
 {id:"p11",name:"सरसों तेल",category:"तेल",price:155,unit:"लीटर",seller:"तेल विक्रेता",city:"भारत",emoji:"🛢️",description:"खाने का सरसों तेल"},
 {id:"p12",name:"देसी घी",category:"दूध और डेयरी",price:550,unit:"लीटर",seller:"डेयरी विक्रेता",city:"भारत",emoji:"🥛",description:"डेयरी उत्पाद"},
 {id:"p13",name:"चीनी",category:"किराना",price:45,unit:"किलो",seller:"किराना विक्रेता",city:"भारत",emoji:"🧂",description:"रोज़मर्रा का किराना"}
];
let products = [...sampleProducts, ...JSON.parse(localStorage.getItem("kb_products")||"[]")];
let cart = JSON.parse(localStorage.getItem("kb_cart")||"[]");
const $ = id => document.getElementById(id);
function toast(message){$("toast").textContent=message;$("toast").classList.remove("hidden");setTimeout(()=>$("toast").classList.add("hidden"),3000)}
function renderCategories(){
 $("categoryGrid").innerHTML=categories.map(c=>`<button class="category" data-category="${c.name}"><span>${c.icon}</span><b>${c.name}</b></button>`).join("");
 $("categoryFilter").innerHTML='<option value="सभी">सभी कैटेगरी</option>'+categories.map(c=>`<option>${c.name}</option>`).join("");
 $("farmerCategory").innerHTML=categories.map(c=>`<option>${c.name}</option>`).join("");
 document.querySelectorAll(".category").forEach(b=>b.addEventListener("click",()=>{$("categoryFilter").value=b.dataset.category;renderProducts();$("products").scrollIntoView({behavior:"smooth"})}));
}
function renderProducts(){
 const query=$("searchInput").value.trim().toLowerCase(), cat=$("categoryFilter").value, sort=$("sortFilter").value;
 let list=products.filter(p=>(cat==="सभी"||p.category===cat)&&(`${p.name} ${p.category} ${p.city} ${p.description||""}`).toLowerCase().includes(query));
 if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);
 $("productGrid").innerHTML=list.map(p=>`<article class="product"><div class="product-img">${p.image?`<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" onerror="this.style.display='none';this.parentElement.textContent='${p.emoji||"🧺"}'">`:p.emoji||"🧺"}</div><div class="product-body"><span class="product-tag">${escapeHtml(p.category)}</span><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description||"किसान / विक्रेता की लिस्टिंग")}</p><p>👨‍🌾 ${escapeHtml(p.seller||"किसान विक्रेता")} · ${escapeHtml(p.city||"भारत")}</p><div class="price-row"><span class="price">₹${Number(p.price).toLocaleString("en-IN")} <small>/${escapeHtml(p.unit||"इकाई")}</small></span><button class="add-btn" data-add="${p.id}">+ कार्ट</button></div></div></article>`).join("");
 $("emptyProducts").classList.toggle("hidden",list.length>0);
 document.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>addToCart(b.dataset.add)));
}
function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function saveCart(){localStorage.setItem("kb_cart",JSON.stringify(cart));$("cartCount").textContent=cart.reduce((n,x)=>n+x.qty,0)}
function addToCart(id){let item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();toast("सामान कार्ट में जोड़ दिया गया।")}
function openModal(id){$(id).classList.remove("hidden");document.body.style.overflow="hidden"}
function closeModal(id){$(id).classList.add("hidden");document.body.style.overflow=""}
function showCart(){
 const lines=cart.map(x=>{let p=products.find(y=>y.id===x.id);return p?`<div class="cart-line"><span>${escapeHtml(p.name)} × ${x.qty}<br><small>₹${p.price} / ${escapeHtml(p.unit||"इकाई")}</small></span><span>₹${(p.price*x.qty).toLocaleString("en-IN")} <button data-remove="${p.id}">हटाएँ</button></span></div>`:""}).join("");
 $("cartItems").innerHTML=lines||"<p>आपका कार्ट खाली है।</p>";
 $("cartTotal").textContent="₹"+cart.reduce((n,x)=>{let p=products.find(y=>y.id===x.id);return n+(p?p.price*x.qty:0)},0).toLocaleString("en-IN");
 document.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{cart=cart.filter(x=>x.id!==b.dataset.remove);saveCart();showCart()}));
 $("orderForm").classList.toggle("hidden",cart.length===0);openModal("cartModal");
}
$("farmerTop").onclick=$("openFarmer").onclick=()=>openModal("farmerModal");
$("cartTop").onclick=showCart;
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
["searchBtn"].forEach(id=>$(id).onclick=renderProducts);
$("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")renderProducts()});
$("categoryFilter").onchange=renderProducts;$("sortFilter").onchange=renderProducts;
$("farmerForm").addEventListener("submit",e=>{
 e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());
 const p={id:"u"+Date.now(),name:d.product,category:d.category,price:Number(d.price),unit:(d.quantity||"इकाई").split(" ").slice(-1)[0],quantity:d.quantity,seller:d.name,city:d.city,phone:d.phone,image:d.image,description:d.description||"किसान द्वारा जोड़ा गया सामान",emoji:(categories.find(c=>c.name===d.category)||{}).icon||"🧺"};
 let saved=JSON.parse(localStorage.getItem("kb_products")||"[]");saved.unshift(p);localStorage.setItem("kb_products",JSON.stringify(saved));products.unshift(p);
 e.target.reset();closeModal("farmerModal");renderProducts();toast("आपकी लिस्टिंग इस डिवाइस में सेव हुई। लाइव दिखाने के लिए डेटाबेस कनेक्शन बाकी है।");$("products").scrollIntoView({behavior:"smooth"});
});
$("orderForm").addEventListener("submit",e=>{
 e.preventDefault();const customer=Object.fromEntries(new FormData(e.target).entries());
 const order={id:"KB"+Date.now(),customer,items:cart.map(x=>({...x})),total:cart.reduce((n,x)=>{let p=products.find(y=>y.id===x.id);return n+(p?p.price*x.qty:0)},0),createdAt:new Date().toISOString()};
 let orders=JSON.parse(localStorage.getItem("kb_orders")||"[]");orders.unshift(order);localStorage.setItem("kb_orders",JSON.stringify(orders));cart=[];saveCart();e.target.reset();closeModal("cartModal");toast("डेमो ऑर्डर इस डिवाइस में सेव हुआ। अभी यह विक्रेता को अपने-आप नहीं पहुँचा है।");
});
renderCategories();renderProducts();saveCart();
