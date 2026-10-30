"use client";

import { useMemo, useState } from "react";

type Status = "Atlikta" | "Vykdoma" | "Planuojama" | "Rizika";
type Work = { id:number; date:string; day:string; client:string; object:string; type:string; crew:string; plan:number; fact:number|null; budget:number; cost:number; status:Status; note:string };

const works: Work[] = [
  {id:1,date:"09-08",day:"Pr",client:"Savivaldybės infrastruktūros skyrius",object:"Objektas Šiaurė · 1 etapas",type:"Pagrindo įrengimas",crew:"Brigada A",plan:2400,fact:2260,budget:48600,cost:43200,status:"Atlikta",note:"Darbų zona perduota kitam etapui"},
  {id:2,date:"09-09",day:"An",client:"Generalinis rangovas A",object:"Rajoninis kelias · atkarpa B",type:"Stabilizavimas",crew:"Brigada B",plan:3200,fact:3110,budget:62400,cost:59000,status:"Atlikta",note:"Kokybės bandymai atlikti"},
  {id:3,date:"09-10",day:"Tr",client:"Regiono kelių užsakovas",object:"Miesto aplinkkelis · zona C",type:"CTB sluoksnis",crew:"Brigada C",plan:4100,fact:2380,budget:71200,cost:38800,status:"Vykdoma",note:"Medžiagos pristatytos pagal grafiką"},
  {id:4,date:"09-11",day:"Kt",client:"Pramonės parko vystytojas",object:"Pramonės parko kelias",type:"Pagrindo stiprinimas",crew:"Brigada A",plan:2850,fact:null,budget:55700,cost:0,status:"Planuojama",note:"Ryto kiekį patvirtinti iki 16:00"},
  {id:5,date:"09-12",day:"Pn",client:"Generalinis rangovas B",object:"Regioninis kelias · ruožas D",type:"Stabilizavimas",crew:"Brigada B",plan:3600,fact:null,budget:68900,cost:0,status:"Rizika",note:"Laukiamas eismo organizavimo patvirtinimas"},
];

const projects = [
  {name:"Miesto aplinkkelis · zona C",client:"Regiono kelių užsakovas",progress:58,margin:18.2,state:"Vykdomas"},
  {name:"Regioninis kelias · ruožas D",client:"Generalinis rangovas B",progress:72,margin:14.6,state:"Vykdomas"},
  {name:"Rajoninis kelias · atkarpa B",client:"Generalinis rangovas A",progress:100,margin:12.8,state:"Užbaigtas"},
];

const euro = (n:number) => new Intl.NumberFormat("lt-LT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);

function Badge({status}:{status:Status}) { return <span className={`badge badge-${status.toLowerCase()}`}><i />{status}</span>; }

export default function Home() {
  const [view,setView] = useState<"board"|"gantt"|"costs">("board");
  const [filter,setFilter] = useState("Visi statusai");
  const [selected,setSelected] = useState<Work|null>(null);
  const [toast,setToast] = useState("");
  const [menu,setMenu] = useState(false);
  const [roi,setRoi] = useState(false);
  const [projectCount,setProjectCount] = useState(12);
  const [teamCount,setTeamCount] = useState(4);
  const [projectTab,setProjectTab] = useState<"summary"|"plan"|"budget"|"journal"|"docs">("summary");
  const visible = useMemo(()=>works.filter(w=>filter==="Visi statusai"||w.status===filter),[filter]);
  const monthlyValue = 900 + projectCount*165 + teamCount*290;
  const notify=(s:string)=>{setToast(s);window.setTimeout(()=>setToast(""),2400)};

  return <main className="shell">
    <aside className={`sidebar ${menu?"open":""}`}>
      <div className="logo"><span className="logo-mark"><i /></span><b>kelio<em>valdymas</em></b></div>
      <nav>
        <a className="active" href="#top"><span>▦</span>Apžvalga</a>
        <a href="#project-control"><span>▤</span>Projektai <b>12</b></a>
        <a href="#schedule"><span>▣</span>Darbų planas</a>
        <a href="#schedule" onClick={()=>setView("costs")}><span>◫</span>Sąnaudos</a>
        <a href="#schedule"><span>◇</span>Technika</a>
        <a href="#projects"><span>◎</span>Užsakovai</a>
      </nav>
      <div className="side-bottom">
        <a href="#projects"><span>⌁</span>Ataskaitos</a><a href="#top"><span>⚙</span>Nustatymai</a>
        <div className="user"><span>DV</span><div><strong>Demo vartotojas</strong><small>Projektų vadovas</small></div><button>⋮</button></div>
      </div>
    </aside>

    <section className="workspace">
      <header className="topbar">
        <div className="top-left"><button className="mobile" onClick={()=>setMenu(!menu)}>☰</button><div><small>DEMONSTRACINIS PORTFELIS</small><strong>Demo kelių projektai</strong></div><button className="drop">⌄</button></div>
        <div className="top-actions"><span className="demo-pill">● DEMO DUOMENYS</span><button className="icon">⌕</button><button className="icon notify">♢<i /></button><button className="primary" onClick={()=>setSelected({...works[3],id:99,object:"Naujas objektas",client:"Pasirinkite užsakovą",fact:null,cost:0})}>＋ Naujas įrašas</button></div>
      </header>

      <div className="content" id="top">
        <div className="heading"><div><p><i /> SINTETINIAI DUOMENYS · JOKIOS REALIOS ĮMONĖS INFORMACIJOS</p><h1>Projektų pulsas</h1><span>Vadovui svarbiausia informacija — sąmata, faktas ir rizikos viename vaizde.</span></div><div className="week"><button>‹</button><b>36 savaitė</b><button>›</button></div></div>

        <section className="value-strip"><div><span className="value-icon">↗</span><p><small>VALDYMO EFEKTAS</small><strong>18 val.</strong><em>mažiau administravimo per savaitę</em></p></div><div><span className="value-icon shield">!</span><p><small>ANKSTYVI SIGNALAI</small><strong>3 nuokrypiai</strong><em>pastebėti prieš sąskaitų išrašymą</em></p></div><div><span className="value-icon clock">◷</span><p><small>SPRENDIMO GREITIS</small><strong>&lt; 2 min.</strong><em>visai projektų situacijai suprasti</em></p></div><button onClick={()=>setRoi(true)}><span>€</span><b>Apskaičiuoti jūsų naudą</b><small>Interaktyvi ROI skaičiuoklė →</small></button></section>

        <section className="kpis">
          <article><div><span className="kicon green">€</span><small>SAVAITĖS SĄMATA</small><em>↗ 4,8%</em></div><strong>306 800 €</strong><p><b>162 400 €</b> faktiškai panaudota</p><i className="meter"><b style={{width:"53%"}} /></i></article>
          <article><div><span className="kicon orange">⌁</span><small>FAKTINĖS SĄNAUDOS</small><em>52,9%</em></div><strong>162 400 €</strong><p><b>144 400 €</b> likutis</p><i className="meter orange"><b style={{width:"53%"}} /></i></article>
          <article><div><span className="kicon blue">✓</span><small>ATLIKTA DARBŲ</small><em>+9%</em></div><strong>7 750 <small>m²</small></strong><p>Iš 16 150 m² suplanuotų</p><i className="meter blue"><b style={{width:"48%"}} /></i></article>
          <article><div><span className="kicon violet">%</span><small>PROGNOZUOJAMA MARŽA</small><em className="bad">↘ 0,6%</em></div><strong>16,9%</strong><p><b>51 850 €</b> portfelio rezultatas</p><i className="meter violet"><b style={{width:"70%"}} /></i></article>
        </section>

        <section className="pulse">
          <article className="card budget-card">
            <div className="section-head"><div><small>PORTFELIO BIUDŽETAS</small><h2>Sąmata prieš faktą</h2></div><button onClick={()=>setView("costs")}>Detaliau →</button></div>
            <div className="budget-total"><strong>306 800 €</strong><span>Patvirtinta sąmata</span></div>
            <div className="budget-bar"><i className="labor" style={{width:"28%"}}/><i className="materials" style={{width:"31%"}}/><i className="equipment" style={{width:"20%"}}/><i className="reserve" style={{width:"21%"}}/></div>
            <div className="legend"><span><i className="labor"/>Darbas <b>90 000 €</b></span><span><i className="materials"/>Medžiagos <b>110 000 €</b></span><span><i className="equipment"/>Technika <b>68 000 €</b></span><span><i className="reserve"/>Rezervas <b>38 800 €</b></span></div>
          </article>
          <aside className="card attention"><div className="attention-head"><b>!</b><div><small>REIKIA DĖMESIO</small><strong>2 projekto signalai</strong></div></div><div className="alert"><i className="red"/><div><b>Regioninis kelias · ruožas D</b><p>Prognozuojama marža 2,1% mažesnė</p></div><span>›</span></div><div className="alert"><i className="amber"/><div><b>Pramonės parko kelias</b><p>Nepatvirtintas rytojaus kiekis</p></div><span>›</span></div></aside>
        </section>

        <section className="card pm-card" id="project-control">
          <div className="pm-head"><div><small>OBJEKTO VALDYMO CENTRAS · VISKAS VIENOJE VIETOJE</small><div className="pm-title"><h2>Miesto aplinkkelis · zona C</h2><span>Vykdomas</span></div><p>Regiono kelių užsakovas · Sutartis DEMO-024 · Atsakingas: Projekto vadovas A</p></div><div className="pm-actions"><button onClick={()=>notify("Projekto duomenys atnaujinti")}>↻ Atnaujinti</button><button className="primary" onClick={()=>notify("Sukurtas naujas projekto veiksmas")}>＋ Naujas veiksmas</button></div></div>
          <div className="pm-tabs">
            <button className={projectTab==="summary"?"active":""} onClick={()=>setProjectTab("summary")}>Suvestinė</button>
            <button className={projectTab==="plan"?"active":""} onClick={()=>setProjectTab("plan")}>Etapai ir Gantt</button>
            <button className={projectTab==="budget"?"active":""} onClick={()=>setProjectTab("budget")}>Sąmata vs faktas</button>
            <button className={projectTab==="journal"?"active":""} onClick={()=>setProjectTab("journal")}>Dienos žurnalas <i>3</i></button>
            <button className={projectTab==="docs"?"active":""} onClick={()=>setProjectTab("docs")}>Dokumentai <i>6</i></button>
          </div>

          {projectTab==="summary"&&<div className="pm-body">
            <div className="pm-summary-grid">
              <article className="pm-panel"><div className="pm-panel-head"><div><small>PROJEKTO EIGA</small><h3>58% atlikta</h3></div><b>Pagal planą</b></div><div className="big-progress"><i style={{width:"58%"}}/></div><div className="milestones"><span className="complete"><i>✓</i><b>Mobilizacija</b><small>Baigta</small></span><span className="complete"><i>✓</i><b>Pagrindo paruošimas</b><small>Baigta</small></span><span className="current"><i>3</i><b>CTB sluoksnis</b><small>Vykdoma · 58%</small></span><span><i>4</i><b>Asfaltavimas</b><small>Planuojama</small></span><span><i>5</i><b>Pridavimas</b><small>Planuojama</small></span></div></article>
              <article className="pm-panel finance-panel"><div className="pm-panel-head"><div><small>FINANSINĖ KONTROLĖ</small><h3>Sąmata ir prognozė</h3></div><b className="margin-good">18,2% marža</b></div><div className="finance-kpis"><span><small>Sąmata</small><b>71 200 €</b></span><span><small>Faktas</small><b>38 800 €</b></span><span><small>Prognozė</small><b>69 100 €</b></span></div><div className="mini-cost"><span><b>Darbas</b><i><em style={{width:"61%"}}/></i><small>12 400 / 20 300 €</small></span><span><b>Medžiagos</b><i><em style={{width:"54%"}}/></i><small>17 600 / 32 400 €</small></span><span><b>Technika</b><i><em style={{width:"48%"}}/></i><small>8 800 / 18 500 €</small></span></div><button onClick={()=>setProjectTab("budget")}>Atidaryti sąmatą →</button></article>
              <article className="pm-panel today-panel"><div className="pm-panel-head"><div><small>ŠIANDIEN OBJEKTE</small><h3>Operacinis faktas</h3></div><span className="live">● Gyvai</span></div><div className="today-facts"><span><i>♟</i><p><small>BRIGADA</small><b>Brigada C · 6 žmonės</b></p></span><span><i>◇</i><p><small>TECHNIKA</small><b>Freza + stabilizatorius</b></p></span><span><i>▧</i><p><small>MEDŽIAGOS</small><b>145 t pristatyta</b></p></span><span><i>!</i><p><small>SPRENDIMAS</small><b>Patvirtinti papildomą kiekį</b></p><em>iki 15:00</em></span></div><button onClick={()=>setProjectTab("journal")}>Atidaryti dienos žurnalą →</button></article>
            </div>
            <div className="pm-bottom"><div><small>NAUJAUSI PROJEKTO ĮVYKIAI</small><div className="activity-row"><span><i className="green-dot"/>10:42</span><p><b>Įvestas 2 380 m² faktinis kiekis</b><small>Brigada C · dienos žurnalas</small></p><em>Automatiškai atnaujinta sąmata</em></div><div className="activity-row"><span><i className="blue-dot"/>09:15</span><p><b>Pridėtas kokybės bandymo protokolas</b><small>Dokumentai · PDF</small></p><em>Patvirtinta</em></div></div><button onClick={()=>setProjectTab("journal")}>Visa istorija →</button></div>
          </div>}

          {projectTab==="plan"&&<div className="pm-tab-content"><div className="tab-intro"><div><small>DARBŲ STRUKTŪRA</small><h3>Etapai, terminai ir priklausomybės</h3><p>Vienas planas brigadoms, technikai ir vadovui — be atskiro Gantt failo.</p></div><button onClick={()=>notify("Planavimo langas atidarytas")}>＋ Pridėti etapą</button></div><div className="phase-table"><div className="phase-head"><span>Etapas</span><span>Atsakingas</span><span>Pradžia</span><span>Pabaiga</span><span>Progresas</span><span>Būsena</span></div>{[["Mobilizacija","Brigada A","08-28","08-29","100%","Baigta"],["Pagrindo paruošimas","Brigada B","09-01","09-05","100%","Baigta"],["CTB sluoksnis","Brigada C","09-08","09-12","58%","Vykdoma"],["Asfaltavimas","Brigada A","09-15","09-18","0%","Planuojama"],["Pridavimas","Projekto vadovas A","09-19","09-22","0%","Planuojama"]].map((r,i)=><div className="phase-row" key={r[0]}><strong>{r[0]}</strong><span>{r[1]}</span><span>{r[2]}</span><span>{r[3]}</span><span><i><em style={{width:r[4]}}/></i><b>{r[4]}</b></span><span className={`phase-status s${i}`}>{r[5]}</span></div>)}</div></div>}

          {projectTab==="budget"&&<div className="pm-tab-content"><div className="tab-intro"><div><small>GYVA PROJEKTO SĄMATA</small><h3>Kiekviena eilutė — nuo plano iki sąskaitos</h3><p>Faktas iš darbų žurnalo automatiškai perskaičiuoja likutį ir maržos prognozę.</p></div><button onClick={()=>notify("Sąmatos versija užfiksuota")}>Užfiksuoti versiją</button></div><div className="budget-table"><div className="budget-row head"><span>Kategorija</span><span>Sąmata</span><span>Faktas</span><span>Įsipareigota</span><span>Prognozė</span><span>Nuokrypis</span></div>{[["Darbas","20 300 €","12 400 €","1 800 €","19 900 €","+400 €"],["Medžiagos","32 400 €","17 600 €","8 900 €","31 800 €","+600 €"],["Technika ir kuras","18 500 €","8 800 €","4 200 €","17 400 €","+1 100 €"]].map(r=><div className="budget-row" key={r[0]}>{r.map((c,i)=><span key={c} className={i===5?"positive":""}>{c}</span>)}</div>)}<div className="budget-row total"><span>Iš viso</span><span>71 200 €</span><span>38 800 €</span><span>14 900 €</span><span>69 100 €</span><span className="positive">+2 100 €</span></div></div></div>}

          {projectTab==="journal"&&<div className="pm-tab-content"><div className="tab-intro"><div><small>VIENAS DARBŲ ŽURNALAS</small><h3>Dienos faktas iš objekto</h3><p>Kiekiai, žmonės, technika, medžiagos, nuotraukos ir pastabos vienoje chronologijoje.</p></div><button onClick={()=>notify("Paruoštas naujas žurnalo įrašas")}>＋ Naujas įrašas</button></div><div className="journal-list">{[["Šiandien · 10:42","CTB sluoksnis","2 380 m²","6 žmonės · 2 technikos vnt.","Faktas įvestas"],["Vakar · 17:20","Pagrindo paruošimas","3 110 m²","5 žmonės · 3 technikos vnt.","Patvirtinta"],["09-08 · 16:55","Mobilizacija","Etapas baigtas","4 žmonės · 2 technikos vnt.","Patvirtinta"]].map((r,i)=><article key={r[0]}><div className="journal-date"><span>{r[0]}</span><i className={i===0?"live":""}>{r[4]}</i></div><h4>{r[1]}</h4><div><span><small>FAKTAS</small><b>{r[2]}</b></span><span><small>RESURSAI</small><b>{r[3]}</b></span><span><small>PRIEDAI</small><b>{i===0?"3 nuotraukos · 1 protokolas":"2 nuotraukos"}</b></span></div><p>{i===0?"Medžiagų tiekimas pagal grafiką. Papildomas kiekis laukia vadovo patvirtinimo.":"Darbai atlikti pagal planą, kritinių pastabų nėra."}</p></article>)}</div></div>}

          {projectTab==="docs"&&<div className="pm-tab-content"><div className="tab-intro"><div><small>PROJEKTO DOKUMENTAI</small><h3>Aktuali versija visada prie projekto</h3><p>Sutartys, brėžiniai, protokolai ir aktai susieti su etapu ir atsakingu asmeniu.</p></div><button onClick={()=>notify("Dokumento įkėlimo langas atidarytas")}>＋ Įkelti dokumentą</button></div><div className="docs-grid">{[["Sutartis ir priedai","PDF · v2","Patvirtinta"],["Darbų vykdymo projektas","PDF · v4","Aktuali"],["Kokybės bandymo protokolas","PDF · šiandien","Patvirtinta"],["Medžiagų deklaracijos","3 failai","Aktualu"],["Eismo organizavimo schema","PDF · v3","Laukia"],["Atliktų darbų aktas","Ruošinys","Rengiama"]].map((r,i)=><article key={r[0]}><span className="doc-icon">▤</span><div><b>{r[0]}</b><small>{r[1]}</small></div><em className={`doc-status d${i}`}>{r[2]}</em><button>⋮</button></article>)}</div></div>}
          <div className="excel-replaced"><span>✓</span><p><b>Šis projekto valdymo centras pakeičia 6 atskiras „Excel“ lenteles</b><small>Projektų sąrašą · Gantt planą · sąmatą · darbų žurnalą · technikos suvestinę · dokumentų registrą</small></p><em>Vienas duomenų šaltinis</em></div>
        </section>

        <section className="card work-card" id="schedule">
          <div className="work-head"><div><small>36 SAVAITĖ</small><h2>Darbų planas</h2></div><div className="tabs"><button className={view==="board"?"active":""} onClick={()=>setView("board")}>Darbų lenta</button><button className={view==="gantt"?"active":""} onClick={()=>setView("gantt")}>Gantt</button><button className={view==="costs"?"active":""} onClick={()=>setView("costs")}>Sąnaudos</button></div><div className="filters"><select value={filter} onChange={e=>setFilter(e.target.value)}><option>Visi statusai</option><option>Atlikta</option><option>Vykdoma</option><option>Planuojama</option><option>Rizika</option></select><button onClick={()=>notify("Ataskaita paruošta eksportui")}>⇩ Eksportuoti</button></div></div>

          {view==="board"&&<div className="table-wrap"><table><thead><tr><th>Data</th><th>Užsakovas / objektas</th><th>Darbų tipas</th><th>Brigada</th><th>Planas</th><th>Faktas</th><th>Biudžetas</th><th>Statusas</th><th/></tr></thead><tbody>{visible.map(w=><tr key={w.id} className={w.id===3?"today":""} onClick={()=>setSelected(w)}><td><span className="date"><b>{w.date}</b><small>{w.day}</small></span></td><td><strong>{w.object}</strong><small>{w.client}</small></td><td><span className="type">{w.type}</span></td><td>{w.crew}</td><td><strong>{w.plan.toLocaleString("lt-LT")}</strong><small>m²</small></td><td>{w.fact?<><strong>{w.fact.toLocaleString("lt-LT")}</strong><small>m²</small></>:<span className="muted">—</span>}</td><td><strong>{euro(w.budget)}</strong><small>{w.cost?`${euro(w.cost)} faktas`:"Sąmata"}</small></td><td><Badge status={w.status}/></td><td><button className="row-open">›</button></td></tr>)}</tbody></table></div>}

          {view==="gantt"&&<div className="gantt"><div className="gantt-title"><span>Objektas</span>{["09.08","09.09","09.10","09.11","09.12"].map(d=><span className={d==="09.10"?"now":""} key={d}>{d}</span>)}</div>{works.map((w,i)=><div className="gantt-row" key={w.id}><strong>{w.object}</strong><button className={`bar tone-${i}`} style={{gridColumn:`${2+Math.max(0,i-1)} / span ${i===2?3:2}`}} onClick={()=>setSelected(w)}>{w.type}</button></div>)}</div>}

          {view==="costs"&&<div className="costs"><article><span>Darbo užmokestis</span><strong>52 100 €</strong><i><b style={{width:"58%"}}/></i><small>58% iš 90 000 €</small></article><article><span>Medžiagos</span><strong>71 800 €</strong><i><b style={{width:"65%"}}/></i><small>65% iš 110 000 €</small></article><article><span>Technika ir kuras</span><strong>38 500 €</strong><i><b style={{width:"57%"}}/></i><small>57% iš 68 000 €</small></article><article className="forecast"><span>Prognozė savaitės pabaigai</span><strong>261 200 €</strong><p>45 600 € mažiau nei sąmata</p></article></div>}
          <div className="table-foot"><span>Rodomi {visible.length} iš 5 savaitės darbų</span><button onClick={()=>notify("Atvertas visas darbų sąrašas")}>Visi darbai →</button></div>
        </section>

        <section className="card projects" id="projects"><div className="section-head"><div><small>AKTYVŪS OBJEKTAI</small><h2>Projektų rezultatas</h2></div><button onClick={()=>notify("Projektų duomenys atnaujinti")}>Atnaujinti</button></div><div className="project-list">{projects.map(p=><article key={p.name}><div><strong>{p.name}</strong><small>{p.client}</small></div><div className="progress"><span><i style={{width:`${p.progress}%`}}/></span><b>{p.progress}%</b></div><div><small>Marža</small><strong>{p.margin}%</strong></div><em className={p.state==="Užbaigtas"?"done":""}>{p.state}</em></article>)}</div></section>
        <section className="integration"><div><small>VIENA SISTEMA, JOKIO DVIGUBO SUVEDIMO</small><h2>Duomenys susijungia su tuo, ką jau naudojate</h2><p>Finansai lieka apskaitoje, planas — Gantt vaizde, o darbų faktas automatiškai tampa vadovo ataskaita.</p></div><div className="integration-flow"><span><b>R</b>Rivilė</span><i>→</i><span><b>X</b>Excel importas</span><i>→</i><span><b>G</b>Gantt planas</span><i>→</i><span className="result"><b>✓</b>Vienas faktas</span></div><button onClick={()=>notify("Integracijų planas įtrauktas į pasiūlymą")}>Peržiūrėti diegimo planą →</button></section>
      </div>
    </section>

    {selected&&<div className="backdrop" onMouseDown={()=>setSelected(null)}><section className="modal" role="dialog" aria-modal="true" onMouseDown={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><small>DIENOS DARBŲ ĮRAŠAS</small><h2>{selected.object}</h2><p>{selected.client} · {selected.date} · {selected.type}</p><div className="form-grid"><label>Faktinis kiekis<input type="number" defaultValue={selected.fact??""} placeholder="0"/><i>m²</i></label><label>Darbo valandos<input type="number" defaultValue={selected.fact?42:""} placeholder="0"/><i>val.</i></label><label>Faktinės sąnaudos<input type="number" defaultValue={selected.cost||""} placeholder="0"/><i>€</i></label><label>Statusas<select defaultValue={selected.status}><option>Planuojama</option><option>Vykdoma</option><option>Atlikta</option><option>Rizika</option></select></label></div><label className="note">Pastaba<textarea defaultValue={selected.note} rows={3}/></label><div className="variance"><span>Plano kiekis <b>{selected.plan.toLocaleString("lt-LT")} m²</b></span><span>Sąmata <b>{euro(selected.budget)}</b></span><span>Nuokrypis <b className="negative">{selected.fact?`${Math.round((selected.fact/selected.plan-1)*100)}%`:"—"}</b></span></div><div className="modal-actions"><button onClick={()=>setSelected(null)}>Atšaukti</button><button className="primary" onClick={()=>{setSelected(null);notify("Dienos faktas išsaugotas")}}>Išsaugoti faktą</button></div></section></div>}
    {roi&&<div className="backdrop" onMouseDown={()=>setRoi(false)}><section className="modal roi-modal" role="dialog" aria-modal="true" onMouseDown={e=>e.stopPropagation()}><button className="close" onClick={()=>setRoi(false)}>×</button><small>NAUDOS SKAIČIUOKLĖ · DEMONSTRACINĖ PROGNOZĖ</small><h2>Kiek gali sutaupyti jūsų komanda?</h2><p>Pakeiskite du parametrus — rezultatą matysite iškart.</p><div className="roi-fields"><label><span>Aktyvūs projektai <b>{projectCount}</b></span><input type="range" min="3" max="30" value={projectCount} onChange={e=>setProjectCount(Number(e.target.value))}/></label><label><span>Projektų vadovai <b>{teamCount}</b></span><input type="range" min="1" max="12" value={teamCount} onChange={e=>setTeamCount(Number(e.target.value))}/></label></div><div className="roi-result"><small>PROGNOZUOJAMA MĖNESIO NAUDA</small><strong>{euro(monthlyValue)}</strong><p>Administravimo laikas + anksčiau pastebėti biudžeto nuokrypiai</p><div><span><b>{Math.round(projectCount*1.4+teamCount*5)} val.</b> sutaupyto laiko</span><span><b>{euro(monthlyValue*12)}</b> metinis potencialas</span></div></div><p className="roi-note">Orientacinis demo skaičiavimas. Tikslus verslo atvejis parengiamas po 60 min. procesų analizės.</p><div className="modal-actions"><button onClick={()=>setRoi(false)}>Uždaryti</button><button className="primary" onClick={()=>{setRoi(false);notify("Naudos santrauka paruošta")}}>Paruošti santrauką</button></div></section></div>}
    {toast&&<div className="toast"><span>✓</span>{toast}</div>}
  </main>;
}
