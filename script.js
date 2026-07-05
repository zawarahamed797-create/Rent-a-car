/* =========================================================
   SHAH E NAJAF MOTORS — SITE SCRIPT
   ========================================================= */

/* ---------------------------------------------------------
   0. INVENTORY DATA (shared across index / inventory / details)
   --------------------------------------------------------- */
const INVENTORY = [
  { id:1, make:"Range Rover", model:"Autobiography", year:2023, price:28500000, category:"suv",   fuel:"Petrol", trans:"Automatic", mileage:"6,200 km", color:"Santorini Black", engine:"3.0L I6 MHEV", power:"395 HP", featured:true,  badge:"Featured",
    desc:"A flagship SUV built for heads of state and connoisseurs alike — commanding presence, cabin craftsmanship, and effortless power delivered through Range Rover's signature Autobiography trim.",
    features:["Panoramic Sunroof","Meridian Sound System","Adaptive Air Suspension","22-inch Alloys","Massage Seats","Night Vision Assist"] },
  { id:2, make:"Mercedes-Benz", model:"S-Class S500", year:2022, price:22000000, category:"sedan", fuel:"Petrol", trans:"Automatic", mileage:"11,400 km", color:"Obsidian Black", engine:"3.0L I6 Turbo", power:"429 HP", featured:true, badge:"Certified",
    desc:"The benchmark of executive luxury sedans — the S500 pairs serene ride comfort with cutting-edge MBUX technology and first-class rear cabin appointments.",
    features:["MBUX Hyperscreen","Executive Rear Seats","Burmester 4D Sound","Air Balance Cabin","Ambient Lighting","Adaptive Cruise Control"] },
  { id:3, make:"BMW", model:"7 Series 740Li", year:2023, price:19800000, category:"sedan", fuel:"Petrol", trans:"Automatic", mileage:"4,800 km", color:"Alpine White", engine:"3.0L I6 Turbo", power:"375 HP", featured:true, badge:"New Arrival",
    desc:"A driver-focused flagship that balances dynamic road presence with a rear cabin worthy of royalty, wrapped in BMW's latest design language.",
    features:["Sky Lounge Roof","Executive Lounge Seating","Bowers & Wilkins Audio","Gesture Control","Laser Headlights","Remote Parking"] },
  { id:4, make:"Toyota", model:"Land Cruiser V8", year:2021, price:24000000, category:"suv", fuel:"Diesel", trans:"Automatic", mileage:"32,000 km", color:"Pearl White", engine:"4.5L V8 Twin-Turbo", power:"268 HP", featured:false, badge:"Popular",
    desc:"Unmatched reliability meets rugged luxury — the definitive choice across Pakistan for those who refuse to compromise on capability or comfort.",
    features:["Crawl Control","Multi-Terrain Select","Cooled Box","Rear Entertainment","3rd Row Seating","Tow Package"] },
  { id:5, make:"Audi", model:"Q8 55 TFSI", year:2022, price:21500000, category:"suv", fuel:"Petrol", trans:"Automatic", mileage:"9,100 km", color:"Daytona Grey", engine:"3.0L V6 Turbo", power:"335 HP", featured:false, badge:"Certified",
    desc:"Coupe-SUV styling with quattro confidence — the Q8 delivers a driver's cockpit wrapped in one of Audi's most dramatic silhouettes.",
    features:["Matrix LED Headlights","Bang & Olufsen Audio","Virtual Cockpit","Quattro AWD","Adaptive Air Suspension","HUD Display"] },
  { id:6, make:"Lexus", model:"LX 570", year:2020, price:26500000, category:"suv", fuel:"Petrol", trans:"Automatic", mileage:"41,000 km", color:"Graphite Black", engine:"5.7L V8", power:"362 HP", featured:false, badge:"Family Favourite",
    desc:"Legendary Toyota engineering finished in Lexus refinement — spacious, silent, and built to outlast trends.",
    features:["Mark Levinson Audio","Heated & Cooled Seats","3rd Row Captain Chairs","Off-Road Modes","Rear DVD","Power Running Boards"] },
  { id:7, make:"Honda", model:"Civic RS Turbo", year:2023, price:6800000, category:"sedan", fuel:"Petrol", trans:"CVT", mileage:"2,300 km", color:"Rallye Red", engine:"1.5L Turbo", power:"178 HP", featured:false, badge:"Best Seller",
    desc:"Sharp, sporty and efficient — the enthusiast's daily sedan with a cabin full of driver-centric tech.",
    features:["Honda Sensing Suite","LED Sequential Signals","Paddle Shifters","Wireless CarPlay","Sunroof","Sport Mode"] },
  { id:8, make:"Porsche", model:"Cayenne S", year:2021, price:32000000, category:"suv", fuel:"Petrol", trans:"Automatic", mileage:"14,600 km", color:"Carrara White", engine:"2.9L V6 Twin-Turbo", power:"434 HP", featured:true, badge:"Rare Find",
    desc:"Sports car DNA in an SUV body — the Cayenne S delivers track-honed handling without sacrificing family practicality.",
    features:["Air Suspension","Sport Chrono Package","Panoramic Roof","Bose Surround Sound","Torque Vectoring","21-inch Wheels"] },
];

/* ---------------------------------------------------------
   1. LOADING SCREEN
   --------------------------------------------------------- */
(function loadingScreen(){
  const loader = document.getElementById('loader');
  if(!loader) return;
  const bar = loader.querySelector('.loader-bar span');
  let p = 0;
  const tick = setInterval(()=>{
    p += Math.random()*18;
    if(p>=100){ p=100; clearInterval(tick); }
    if(bar) bar.style.width = p+'%';
  }, 140);
  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      loader.classList.add('hidden');
      document.body.style.overflow='';
    }, 700);
  });
  // Safety fallback in case 'load' is delayed by slow assets
  setTimeout(()=>{ loader.classList.add('hidden'); }, 4500);
})();

/* ---------------------------------------------------------
   2. NAVIGATION (scroll state + mobile toggle + active link)
   --------------------------------------------------------- */
(function nav(){
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if(navbar){
    const onScroll = ()=> navbar.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
  }
  if(toggle && links){
    toggle.addEventListener('click', ()=>{
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{
      toggle.classList.remove('open'); links.classList.remove('open');
    }));
  }
  // mark active nav link based on current file
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === current || (current==='' && href==='index.html')) a.classList.add('active');
  });
})();

/* ---------------------------------------------------------
   3. BACK TO TOP
   --------------------------------------------------------- */
(function backTop(){
  const btn = document.getElementById('backTop');
  if(!btn) return;
  window.addEventListener('scroll', ()=> btn.classList.toggle('show', window.scrollY > 600), { passive:true });
  btn.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));
})();

/* ---------------------------------------------------------
   4. SCROLL REVEAL
   --------------------------------------------------------- */
(function reveal(){
  const els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.15 });
  els.forEach(el=> io.observe(el));
})();

/* ---------------------------------------------------------
   5. ANIMATED COUNTERS
   --------------------------------------------------------- */
(function counters(){
  const nums = document.querySelectorAll('[data-count]');
  if(!nums.length) return;
  const animate = (el)=>{
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1800; let start=null;
    const step = (t)=>{
      if(!start) start=t;
      const progress = Math.min((t-start)/dur, 1);
      const eased = 1 - Math.pow(1-progress, 3);
      const val = Math.floor(eased*target);
      el.textContent = val.toLocaleString() + suffix;
      if(progress<1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + suffix;
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ animate(e.target); io.unobserve(e.target); } });
  }, { threshold:0.5 });
  nums.forEach(n=> io.observe(n));
})();

/* ---------------------------------------------------------
   6. TESTIMONIAL SLIDER
   --------------------------------------------------------- */
(function testiSlider(){
  const track = document.querySelector('.testi-slides');
  if(!track) return;
  const slides = track.children.length;
  const dotsWrap = document.querySelector('.testi-nav');
  let idx = 0;
  if(dotsWrap){
    dotsWrap.innerHTML='';
    for(let i=0;i<slides;i++){
      const d = document.createElement('button');
      d.className = 'testi-dot' + (i===0?' active':'');
      d.addEventListener('click', ()=> go(i));
      dotsWrap.appendChild(d);
    }
  }
  function go(i){
    idx = (i+slides)%slides;
    track.style.transform = `translateX(-${idx*100}%)`;
    dotsWrap && dotsWrap.querySelectorAll('.testi-dot').forEach((d,n)=> d.classList.toggle('active', n===idx));
  }
  document.querySelector('.testi-arrow.next')?.addEventListener('click', ()=> go(idx+1));
  document.querySelector('.testi-arrow.prev')?.addEventListener('click', ()=> go(idx-1));
  let auto = setInterval(()=> go(idx+1), 6000);
  document.querySelector('.testi-slider')?.addEventListener('mouseenter', ()=> clearInterval(auto));
  document.querySelector('.testi-slider')?.addEventListener('mouseleave', ()=> auto = setInterval(()=> go(idx+1), 6000));
})();

/* ---------------------------------------------------------
   7. FAQ ACCORDION
   --------------------------------------------------------- */
(function faq(){
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q?.addEventListener('click', ()=>{
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i=>{
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
})();

/* ---------------------------------------------------------
   8. NEWSLETTER + CONTACT + FINANCE APPLICATION FORMS
   --------------------------------------------------------- */
function bindFormSuccess(formId, successId){
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    form.style.display = 'none';
    if(success) success.classList.add('show');
    form.reset();
  });
}
bindFormSuccess('contactForm','contactSuccess');
bindFormSuccess('financeForm','financeSuccess');
bindFormSuccess('newsletterForm','newsletterSuccess');

/* ---------------------------------------------------------
   9. CAR SILHOUETTE SVG (used on cards + details — no photo assets)
   --------------------------------------------------------- */
function carSVG(){
  return `<svg viewBox="0 0 512 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a3a40"/><stop offset="1" stop-color="#131316"/>
    </linearGradient></defs>
    <path fill="url(#cg)" d="M20 140 C25 95 70 90 110 78 C150 62 190 40 260 38 C330 36 380 55 420 82 C450 100 480 105 495 140 L495 152 L20 152 Z"/>
    <path fill="#0a0a0c" opacity=".55" d="M120 82 C160 60 195 46 255 45 C310 44 350 58 385 80 L370 92 L135 92 Z"/>
    <circle cx="110" cy="152" r="26" fill="#0c0c0e" stroke="#e10600" stroke-width="3"/>
    <circle cx="400" cy="152" r="26" fill="#0c0c0e" stroke="#e10600" stroke-width="3"/>
    <circle cx="110" cy="152" r="9" fill="#3a3a40"/>
    <circle cx="400" cy="152" r="9" fill="#3a3a40"/>
  </svg>`;
}

/* ---------------------------------------------------------
   10. FORMAT HELPERS
   --------------------------------------------------------- */
const fmtPKR = (n)=> 'PKR ' + Number(n).toLocaleString('en-PK');

/* ---------------------------------------------------------
   11. RENDER: FEATURED CARS (home page) + FULL INVENTORY (inventory page)
   --------------------------------------------------------- */
function carCardHTML(car){
  return `
  <article class="glass-card car-card reveal">
    <span class="tag">${car.badge}</span>
    <div class="car-visual">${carSVG()}</div>
    <div class="car-body">
      <div class="make">${car.make}</div>
      <h3>${car.model} <span style="color:var(--c-mist);font-weight:400;">'${car.year}</span></h3>
      <div class="car-specs">
        <div>⛽ <strong>${car.fuel}</strong></div>
        <div>⚙ <strong>${car.trans}</strong></div>
        <div>📍 <strong>${car.mileage}</strong></div>
      </div>
      <div class="car-footer">
        <div class="car-price"><small>Price</small>${fmtPKR(car.price)}</div>
        <a class="btn btn-primary btn-sm" href="car-details.html?id=${car.id}">View Details</a>
      </div>
    </div>
  </article>`;
}

(function renderFeatured(){
  const wrap = document.getElementById('featuredCars');
  if(!wrap) return;
  wrap.innerHTML = INVENTORY.filter(c=>c.featured).slice(0,3).map(carCardHTML).join('');
})();

(function renderInventory(){
  const wrap = document.getElementById('inventoryGrid');
  if(!wrap) return;
  const countLabel = document.getElementById('resultsCount');
  const searchInput = document.getElementById('carSearch');
  const makeSelect  = document.getElementById('filterMake');
  const bodySelect  = document.getElementById('filterBody');
  const priceSelect = document.getElementById('filterPrice');
  const sortSelect  = document.getElementById('filterSort');

  // populate make options dynamically
  if(makeSelect){
    const makes = [...new Set(INVENTORY.map(c=>c.make))].sort();
    makes.forEach(m=>{
      const o = document.createElement('option'); o.value = m; o.textContent = m; makeSelect.appendChild(o);
    });
  }

  function apply(){
    let list = [...INVENTORY];
    const q = (searchInput?.value || '').toLowerCase().trim();
    if(q) list = list.filter(c => `${c.make} ${c.model} ${c.year}`.toLowerCase().includes(q));
    if(makeSelect?.value) list = list.filter(c => c.make === makeSelect.value);
    if(bodySelect?.value) list = list.filter(c => c.category === bodySelect.value);
    if(priceSelect?.value){
      const [min,max] = priceSelect.value.split('-').map(Number);
      list = list.filter(c => c.price >= min && (max ? c.price <= max : true));
    }
    if(sortSelect?.value === 'price-asc') list.sort((a,b)=>a.price-b.price);
    if(sortSelect?.value === 'price-desc') list.sort((a,b)=>b.price-a.price);
    if(sortSelect?.value === 'year-desc') list.sort((a,b)=>b.year-a.year);

    wrap.innerHTML = list.length ? list.map(carCardHTML).join('') : `<div class="no-results">No vehicles match your search — try adjusting your filters.</div>`;
    if(countLabel) countLabel.textContent = `${list.length} vehicle${list.length!==1?'s':''} found`;
    // re-run reveal observer for freshly injected cards
    wrap.querySelectorAll('.reveal').forEach(el=> el.classList.add('in'));
  }
  [searchInput, makeSelect, bodySelect, priceSelect, sortSelect].forEach(el=> el?.addEventListener('input', apply));
  apply();
})();

/* ---------------------------------------------------------
   12. CAR DETAILS PAGE
   --------------------------------------------------------- */
(function carDetails(){
  const root = document.getElementById('carDetailsRoot');
  if(!root) return;
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id')) || INVENTORY[0].id;
  const car = INVENTORY.find(c=>c.id===id) || INVENTORY[0];

  document.title = `${car.make} ${car.model} (${car.year}) — Shah E Najaf Motors`;

  document.getElementById('dTitle').textContent = `${car.make} ${car.model}`;
  document.getElementById('dYear').textContent = car.year;
  document.getElementById('dPrice').textContent = fmtPKR(car.price);
  document.getElementById('dDesc').textContent = car.desc;
  document.getElementById('dBadge').textContent = car.badge;
  document.getElementById('dFeatures').innerHTML = car.features.map(f=>`<span>${f}</span>`).join('');

  const specRows = {
    'Make': car.make, 'Model': car.model, 'Year': car.year, 'Body Type': car.category.toUpperCase(),
    'Fuel Type': car.fuel, 'Transmission': car.trans, 'Engine': car.engine, 'Power': car.power,
    'Mileage': car.mileage, 'Exterior Colour': car.color, 'Condition': 'Certified Pre-Owned'
  };
  document.getElementById('dSpecs').innerHTML = Object.entries(specRows).map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join('');

  const waMsg = encodeURIComponent(`Assalam-o-Alaikum, I'm interested in the ${car.make} ${car.model} (${car.year}) listed for ${fmtPKR(car.price)} on Shah E Najaf Motors. Please share more details.`);
  document.getElementById('dWhatsapp').href = `https://wa.me/923004981297?text=${waMsg}`;
  document.getElementById('dCall').href = `tel:+923004981297`;

  // similar vehicles
  const similar = INVENTORY.filter(c=> c.id!==car.id && c.category===car.category).slice(0,3);
  const simWrap = document.getElementById('similarCars');
  if(simWrap) simWrap.innerHTML = (similar.length? similar : INVENTORY.filter(c=>c.id!==car.id).slice(0,3)).map(carCardHTML).join('');

  // is this the showcase 3D model car? (id 1 gets the real GLTF viewer)
  if(car.id === 1){
    document.getElementById('detailsSVGView')?.setAttribute('style','display:none;');
    document.getElementById('detailsCanvasWrap')?.setAttribute('style','display:block;');
    initCarModel('detailsCanvas', { autoRotate:true, exposure:1.05 });
  } else {
    const svgHost = document.getElementById('detailsSVG');
    if(svgHost) svgHost.innerHTML = carSVG();
  }
})();

/* ---------------------------------------------------------
   13. TABS (car details page: Overview / Specs / Features)
   --------------------------------------------------------- */
(function tabs(){
  document.querySelectorAll('.tab-row').forEach(row=>{
    const btns = row.querySelectorAll('.tab-btn');
    btns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const paneId = btn.dataset.tab;
        btns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const container = row.closest('.tabs-container') || document;
        container.querySelectorAll('.tab-pane').forEach(p=> p.classList.remove('active'));
        document.getElementById(paneId)?.classList.add('active');
      });
    });
  });
})();

/* ---------------------------------------------------------
   14. FINANCE CALCULATOR
   --------------------------------------------------------- */
(function financeCalc(){
  const priceInput = document.getElementById('calcPrice');
  const downInput  = document.getElementById('calcDown');
  const tenureInput= document.getElementById('calcTenure');
  const rateInput  = document.getElementById('calcRate');
  if(!priceInput) return;

  const priceVal = document.getElementById('calcPriceVal');
  const downVal  = document.getElementById('calcDownVal');
  const tenureVal= document.getElementById('calcTenureVal');
  const rateVal  = document.getElementById('calcRateVal');
  const monthlyOut = document.getElementById('calcMonthly');
  const principalOut = document.getElementById('calcPrincipal');
  const interestOut = document.getElementById('calcInterest');
  const totalOut = document.getElementById('calcTotal');

  function compute(){
    const price = Number(priceInput.value);
    const downPct = Number(downInput.value);
    const years = Number(tenureInput.value);
    const rate = Number(rateInput.value);

    const down = price * (downPct/100);
    const principal = price - down;
    const monthlyRate = (rate/100)/12;
    const n = years*12;
    const monthly = monthlyRate>0
      ? (principal * monthlyRate * Math.pow(1+monthlyRate,n)) / (Math.pow(1+monthlyRate,n)-1)
      : principal/n;
    const total = monthly*n;
    const interest = total - principal;

    priceVal.textContent = fmtPKR(price);
    downVal.textContent = downPct+'% · '+fmtPKR(Math.round(down));
    tenureVal.textContent = years+' Years';
    rateVal.textContent = rate+'%';
    monthlyOut.textContent = fmtPKR(Math.round(monthly));
    principalOut.textContent = fmtPKR(Math.round(principal));
    interestOut.textContent = fmtPKR(Math.round(interest));
    totalOut.textContent = fmtPKR(Math.round(total));
  }
  [priceInput, downInput, tenureInput, rateInput].forEach(el=> el.addEventListener('input', compute));
  compute();
})();

/* =========================================================
   15. THREE.JS 3D CAR MODEL — hero + car-details showcase
   Loads scene.gltf from ROOT (no /models or /textures folder).
   Automatically rewrites any "textures/xxx" URIs to "xxx" so the
   loader resolves images that live beside index.html.
   ========================================================= */
function initCarModel(canvasId, opts){
  opts = opts || {};
  const canvas = document.getElementById(canvasId);
  if(!canvas || typeof THREE === 'undefined') return;

  const wrap = canvas.parentElement;
  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(35, wrap.clientWidth/wrap.clientHeight, 0.1, 1000);
  camera.position.set(4.2, 1.6, 5.4);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true, powerPreference:'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = opts.exposure || 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // ---- Lighting rig ----
  const ambient = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(6, 8, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 30;
  key.shadow.bias = -0.0004;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xff3b30, 1.4);
  rim.position.set(-6, 3, -6);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(0x8fb2ff, 0.5);
  fill.position.set(-4, 2, 6);
  scene.add(fill);

  // ---- Ground shadow catcher ----
  const groundGeo = new THREE.PlaneGeometry(40, 40);
  const groundMat = new THREE.ShadowMaterial({ opacity: 0.35 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI/2;
  ground.position.y = -0.02;
  ground.receiveShadow = true;
  scene.add(ground);

  // ---- Environment (procedural, no external HDRI dependency) ----
  if(THREE.RoomEnvironment && THREE.PMREMGenerator){
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new THREE.RoomEnvironment(), 0.04).texture;
    scene.environment = env;
  }

  // ---- Controls ----
  let controls = null;
  if(THREE.OrbitControls){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI/2 - 0.02;
    controls.autoRotate = opts.autoRotate !== false;
    controls.autoRotateSpeed = 0.9;
    controls.target.set(0, 0.6, 0);
  }

  // ---- Post-processing: bloom ----
  let composer = null, bloomPass = null;
  if(THREE.EffectComposer && THREE.RenderPass && THREE.UnrealBloomPass){
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));
    bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(wrap.clientWidth, wrap.clientHeight), 0.35, 0.6, 0.85);
    composer.addPass(bloomPass);
  }

  // ---- Load + patch scene.gltf, then parse from memory ----
  fetch('./scene.gltf')
    .then(res => {
      if(!res.ok) throw new Error('scene.gltf not found at root');
      return res.text();
    })
    .then(text => {
      let json;
      try{ json = JSON.parse(text); } catch(e){ throw new Error('scene.gltf is not valid JSON'); }

      // Rewrite any "textures/name.ext" URI to "name.ext" since every
      // texture image lives beside index.html in the project root.
      const fixUri = (uri)=>{
        if(typeof uri !== 'string') return uri;
        return uri.replace(/^(?:\.?\/)?textures\//i, '');
      };
      if(Array.isArray(json.images)){
        json.images.forEach(img=>{ if(img && img.uri) img.uri = fixUri(img.uri); });
      }
      if(Array.isArray(json.buffers)){
        json.buffers.forEach(buf=>{ if(buf && buf.uri) buf.uri = fixUri(buf.uri); });
      }

      const fixedJson = JSON.stringify(json);
      const loader = new THREE.GLTFLoader();
      if(THREE.DRACOLoader){
        try{
          const draco = new THREE.DRACOLoader();
          draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
          loader.setDRACOLoader(draco);
        }catch(e){ /* optional */ }
      }

      // Resource path './' resolves buffers/images relative to the
      // project root, exactly where scene.bin and the *_baseColor
      // textures already live.
      loader.parse(fixedJson, './', (gltf)=>{
        const model = gltf.scene;
        model.traverse(node=>{
          if(node.isMesh){
            node.castShadow = true;
            node.receiveShadow = true;
            if(node.material) node.material.envMapIntensity = 1.1;
          }
        });

        // Normalize scale/position so any model fills the frame nicely
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3(); box.getSize(size);
        const center = new THREE.Vector3(); box.getCenter(center);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 3.1 / maxDim;
        model.scale.setScalar(scale);
        box.setFromObject(model); box.getCenter(center);
        model.position.sub(center);
        model.position.y = 0;

        scene.add(model);
        canvas.classList.add('ready');

        // Smooth camera intro animation
        const startPos = new THREE.Vector3(9, 4, 10);
        const endPos = camera.position.clone();
        camera.position.copy(startPos);
        let t0 = null;
        function introFly(t){
          if(!t0) t0 = t;
          const p = Math.min((t - t0) / 2200, 1);
          const eased = 1 - Math.pow(1-p, 3);
          camera.position.lerpVectors(startPos, endPos, eased);
          camera.lookAt(0, 0.6, 0);
          if(p < 1) requestAnimationFrame(introFly);
        }
        requestAnimationFrame(introFly);
      },
      (err)=>{
        console.warn('GLTF parse/load issue:', err);
        showFallback();
      });
    })
    .catch(err=>{
      console.warn('Could not load 3D model:', err.message);
      showFallback();
    });

  function showFallback(){
    // Graceful degrade: keep the ambient lit stage + gradient instead of a blank canvas
    canvas.classList.add('ready');
    wrap.classList.add('model-fallback');
  }

  // ---- Resize handling ----
  function onResize(){
    const w = wrap.clientWidth, h = wrap.clientHeight;
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
    renderer.setSize(w,h);
    if(composer) composer.setSize(w,h);
  }
  window.addEventListener('resize', onResize);

  // ---- Render loop ----
  function animate(){
    requestAnimationFrame(animate);
    if(controls) controls.update();
    if(composer) composer.render(); else renderer.render(scene, camera);
  }
  animate();
}

// Auto-init hero model if the hero canvas exists on this page
document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('car-canvas')){
    initCarModel('car-canvas', { autoRotate:true, exposure:1.1 });
  }
});
