"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  models,
  researchSources,
  specialEditions,
  type DaytonaModel,
  type EngineFamily,
} from "@/data/daytona";

type Filter = "all" | EngineFamily;

const archiveBasePath = "/archives/triumph-daytona-archive";

const getModelImageSrc = (image: string) =>
  image.startsWith("/images/motorcycles/") ? image : `${archiveBasePath}${image}`;

const filters: { value: Filter; label: string; note: string }[] = [
  { value: "all", label: "全部", note: `${models.length} 節點` },
  { value: "triple", label: "三缸", note: "品牌主脈" },
  { value: "four", label: "四缸", note: "早期分支" },
  { value: "mixed", label: "雙動力", note: "模組年代" },
];

function FilterMark({ family }: { family: EngineFamily }) {
  if (family === "triple") return <span className="engine-mark">III</span>;
  if (family === "four") return <span className="engine-mark">IIII</span>;
  return <span className="engine-mark">III / IIII</span>;
}

function ModelImage({ model, priority = false }: { model: DaytonaModel; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [page, setPage] = useState(0);
  const [cycle, setCycle] = useState(0);
  const images = model.images?.length ? model.images : [model.image];

  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => {
      setPage((current) => (current + 1) % images.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [cycle, images.length, model.id]);

  const changePage = (nextPage: number) => {
    setPage((nextPage + images.length) % images.length);
    setCycle((current) => current + 1);
  };

  if (failed) {
    return (
      <div className="image-fallback" role="img" aria-label={`${model.name} 圖片待補`}>
        <span>{model.year}</span>
        <strong>{model.name}</strong>
        <small>ARCHIVE IMAGE PENDING</small>
      </div>
    );
  }

  return (
    <>
      <span
        className="image-track"
        style={{ transform: `translateX(-${page * 100}%)` }}
      >
        {images.map((image, index) => (
          <Image
            key={image}
            src={getModelImageSrc(image)}
            alt={`${model.imageAlt}${images.length > 1 ? `，第 ${index + 1} 張` : ""}`}
            width={1600}
            height={1000}
            className={model.imageFit === "contain" ? "is-contain" : undefined}
            loading={priority && index === 0 ? "eager" : "lazy"}
            onError={() => setFailed(true)}
          />
        ))}
      </span>
      {images.length > 1 ? (
        <span className="image-pagination" aria-live="polite" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="image-page-arrow" onClick={() => changePage(page - 1)} aria-label="上一張圖片">‹</button>
          <span className="image-page-count">{page + 1} / {images.length}</span>
          <span className="image-page-dots">
            {images.map((image, index) => (
              <button
                type="button"
                className={index === page ? "active" : ""}
                key={image}
                onClick={() => changePage(index)}
                aria-label={`切換到第 ${index + 1} 張圖片`}
                aria-current={index === page ? "true" : undefined}
              />
            ))}
          </span>
          <button type="button" className="image-page-arrow" onClick={() => changePage(page + 1)} aria-label="下一張圖片">›</button>
        </span>
      ) : null}
    </>
  );
}

function ModelDrawer({ model, onClose }: { model: DaytonaModel; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("drawer-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("drawer-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="drawer-layer" role="presentation" onMouseDown={onClose}>
      <aside
        className="model-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="drawer-close" type="button" onClick={onClose} aria-label="關閉詳情">
          <span aria-hidden="true">×</span>
        </button>
        <div className="drawer-media">
          <ModelImage model={model} priority />
          <div className="drawer-year">{model.year}</div>
        </div>
        <div className="drawer-content">
          <div className="drawer-kicker">{model.eyebrow}</div>
          <h2 id="drawer-title">{model.name}</h2>
          <p className="drawer-position">{model.position}</p>
          <dl className="drawer-specs">
            <div>
              <dt>排氣量</dt>
              <dd>{model.capacity}</dd>
            </div>
            <div>
              <dt>引擎形式</dt>
              <dd>{model.engine}</dd>
            </div>
          </dl>
          <section>
            <span className="section-index">01</span>
            <h3>這一代是什麼</h3>
            <p>{model.summary}</p>
          </section>
          <section>
            <span className="section-index">02</span>
            <h3>與前代的差異</h3>
            <p>{model.difference}</p>
          </section>
          <section>
            <span className="section-index">03</span>
            <h3>歷史重要性</h3>
            <p>{model.significance}</p>
          </section>
          <div className="drawer-links">
            <a href={model.sourceUrl} target="_blank" rel="noreferrer">
              查閱資料來源 <span aria-hidden="true">↗</span>
            </a>
            <a href={model.imageSource} target="_blank" rel="noreferrer">
              圖片與授權 <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="image-credit">
            Photo: {model.imageCredit} · {model.imageLicense}
          </p>
        </div>
      </aside>
    </div>
  );
}

export function DaytonaArchive() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<DaytonaModel | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredModels = useMemo(
    () => (filter === "all" ? models : models.filter((model) => model.family === filter)),
    [filter],
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const openById = (id: string) => {
    const model = models.find((item) => item.id === id);
    if (model) setSelected(model);
  };

  return (
    <main>
      <header className="site-header">
        <button className="brand" type="button" onClick={() => scrollTo("top")} aria-label="回到頁首">
          <span className="brand-mark">T</span>
          <span>
            <b>TRIUMPH</b>
            <small>DAYTONA ARCHIVE</small>
          </span>
        </button>
        <nav className={menuOpen ? "header-nav is-open" : "header-nav"} aria-label="主要導覽">
          <button type="button" onClick={() => scrollTo("timeline")}>年代主線</button>
          <button type="button" onClick={() => scrollTo("specials")}>特殊版本</button>
          <button type="button" onClick={() => scrollTo("method")}>編年原則</button>
          <button type="button" onClick={() => scrollTo("sources")}>資料來源</button>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label="開啟導覽選單"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="overline"><span /> HINCKLEY · 1991—2026</div>
          <h1>
            <span>TRIUMPH</span>
            <strong>DAYTONA</strong>
            <em>仿賽年代圖鑑</em>
          </h1>
          <p>
            從模組化的 750 / 1000，到定義三缸仿賽的 675，
            再到兼顧道路與跑格的 660。以世代、機械變化與賽事脈絡，
            重讀 Daytona 的三十五年。
          </p>
          <div className="hero-actions">
            <button type="button" className="primary-action" onClick={() => scrollTo("timeline")}>
              進入年代主線 <span aria-hidden="true">↓</span>
            </button>
            <button type="button" className="text-action" onClick={() => scrollTo("method")}>
              圖鑑怎麼分代？
            </button>
          </div>
          <div className="hero-stats" aria-label="圖鑑統計">
            <div><b>35</b><span>YEARS<br />OF DAYTONA</span></div>
            <div><b>15</b><span>TIMELINE<br />NODES</span></div>
            <div><b>3 / 4</b><span>CYLINDER<br />PATHS</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src={`${archiveBasePath}/images/models/daytona-official-archive.jpg`}
            alt="Triumph Daytona 675 官方歷史影像"
            width={1600}
            height={1000}
            priority
          />
          <div className="hero-visual-label">
            <span>2006</span>
            <b>THE TRIPLE THAT<br />CHANGED THE CLASS</b>
          </div>
          <div className="hero-number" aria-hidden="true">675</div>
        </div>
        <div className="hero-rail" aria-hidden="true">
          <span>1991</span><i /><span>1997</span><i /><span>2006</span><i /><span>2020</span><i /><span>2026</span>
        </div>
      </section>

      <section className="intro-strip" aria-label="圖鑑摘要">
        <div><span>ORIGIN</span><b>1966 Daytona 200</b></div>
        <div><span>MODERN START</span><b>1991 Hinckley Daytona</b></div>
        <div><span>DEFINING MODEL</span><b>2006 Daytona 675</b></div>
        <div><span>CURRENT LINE</span><b>2026 Daytona 660</b></div>
      </section>

      <section className="timeline-section" id="timeline">
        <div className="section-heading">
          <div>
            <span className="overline"><span /> MAIN CHRONOLOGY</span>
            <h2>主年代時間軸</h2>
          </div>
          <p>
            只有平台、引擎、底盤或產品定位出現實質改變，才另立節點。
            單純換色不算新世代。
          </p>
        </div>

        <div className="filter-bar" role="group" aria-label="依引擎形式篩選">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              className={filter === item.value ? "active" : ""}
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              <span>{item.label}</span>
              <small>{item.note}</small>
            </button>
          ))}
        </div>

        <div className="timeline-list">
          {filteredModels.map((model, index) => (
            <article
              className={`timeline-card ${model.isUpdate ? "is-update" : ""}`}
              key={model.id}
              id={model.id}
            >
              <div className="timeline-node" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="model-media">
                <ModelImage model={model} />
                <button className="model-open-button" type="button" onClick={() => setSelected(model)} aria-label={`查看 ${model.name} 詳情`} />
                <span className="media-corner">VIEW MODEL <b>↗</b></span>
              </div>
              <div className="model-copy">
                <div className="model-topline">
                  <span>{model.eyebrow}</span>
                  <FilterMark family={model.family} />
                </div>
                <time>{model.year}</time>
                <h3>{model.name}</h3>
                <p className="model-position">{model.position}</p>
                <div className="spec-line">
                  <span><small>DISPLACEMENT</small>{model.capacity}</span>
                  <span><small>ENGINE</small>{model.engine}</span>
                </div>
                <p className="model-summary">{model.summary}</p>
                <button className="detail-button" type="button" onClick={() => setSelected(model)}>
                  世代差異與歷史定位 <span aria-hidden="true">→</span>
                </button>
                <a className="source-tag" href={model.sourceUrl} target="_blank" rel="noreferrer">
                  {model.sourceLabel} ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="specials-section" id="specials">
        <div className="specials-header">
          <span className="vertical-word" aria-hidden="true">LIMITED</span>
          <div>
            <span className="overline"><span /> LIMITED / SPECIAL</span>
            <h2>限量與特殊版本</h2>
            <p>
              特別版不等於新世代。這裡依「機械升級、賽事意義、收尾紀念、配色套件」拆開判讀。
            </p>
          </div>
        </div>
        <div className="special-grid">
          {specialEditions.map((edition, index) => (
            <button key={edition.name} type="button" onClick={() => openById(edition.modelId)}>
              <span className="special-no">{String(index + 1).padStart(2, "0")}</span>
              <time>{edition.year}</time>
              <h3>{edition.name}</h3>
              <b>{edition.kind}</b>
              <p>{edition.detail}</p>
              <span className="special-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="method-copy">
          <span className="overline"><span /> EDITORIAL METHOD</span>
          <h2>Daytona 675<br />分代快速比較</h2>
          <p>Daytona 675 是車系本體，Daytona 675R 是高規版本，不是另一個世代。2009—2012 可視為初代中期改款；2013 年因新引擎、新車架、新車身與低位排氣，才適合稱為第二代大改款。</p>
        </div>
        <ol className="method-list">
          <li><span>01</span><div><b>675</b><p>Daytona 675 車系的標準車型，也是世代判讀的本體。</p></div></li>
          <li><span>02</span><div><b>675R</b><p>建立在同世代 675 上的高規版本，不是另一個世代。</p></div></li>
          <li><span>03</span><div><b>2009—2012</b><p>初代中期改款，仍保留座墊下方高位排氣架構。</p></div></li>
          <li><span>04</span><div><b>2013—2018</b><p>引擎、車架、車身與低位排氣全面更新的第二代大改款。</p></div></li>
        </ol>
      </section>

      <section className="sources-section" id="sources">
        <div className="section-heading compact">
          <div>
            <span className="overline"><span /> VERIFIED SOURCES</span>
            <h2>查證與圖片來源</h2>
          </div>
          <p>年份以 Triumph 官方資料為主，博物館資料補足早期特仕；圖片逐張保留作者與授權連結。</p>
        </div>
        <div className="source-list">
          {researchSources.map((source, index) => (
            <a href={source.url} target="_blank" rel="noreferrer" key={source.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{source.label}</b>
              <p>{source.use}</p>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
        <p className="source-note">
          編輯備註：早期車款市場資料常把「首次亮相、開始交車、登記年式」混用。本頁遇到這類情況時，會明確標出「發表 / 年式」，不以單一年份強行概括。
        </p>
      </section>

      <footer>
        <div>
          <span className="brand-mark">T</span>
          <p><b>TRIUMPH DAYTONA ARCHIVE</b><small>UNOFFICIAL · EDUCATIONAL CHRONOLOGY</small></p>
        </div>
        <p>1991—2026 · THREE CYLINDERS, FOUR CYLINDERS, ONE NAME.</p>
        <button type="button" onClick={() => scrollTo("top")}>BACK TO TOP ↑</button>
      </footer>

      {selected ? <ModelDrawer model={selected} onClose={() => setSelected(null)} /> : null}
    </main>
  );
}
