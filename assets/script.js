async function loadPublications() {
  const res = await fetch("assets/data/publications.json");
  const pubs = await res.json();

  const list = document.getElementById("pubList");
  const search = document.getElementById("pubSearch");
  const filter = document.getElementById("pubFilter");

  function render() {
    const q = (search.value || "").toLowerCase().trim();
    const f = filter.value;

    const items = pubs.filter(p => {
      const hay = `${p.title} ${p.authors} ${p.venue} ${p.year}`.toLowerCase();
      const okSearch = !q || hay.includes(q);
      const okFilter = (f === "all") || (p.type === f);
      return okSearch && okFilter;
    });

    list.innerHTML = items.map(p => {
      const links = [
        p.pdf ? `<a href="${p.pdf}" target="_blank" rel="noreferrer">PDF</a>` : "",
        p.code ? `<a href="${p.code}" target="_blank" rel="noreferrer">Code</a>` : "",
        p.doi  ? `<a href="${p.doi}" target="_blank" rel="noreferrer">DOI</a>`  : "",
        p.video? `<a href="${p.video}" target="_blank" rel="noreferrer">Video</a>`: ""
      ].filter(Boolean).join(" · ");

      return `
        <div class="pub">
          <div class="title">${p.title}<span class="tag">${p.type}</span></div>
          <div class="authors">${p.authors}</div>
          <div class="venue">${p.venue} · ${p.year}</div>
          ${links ? `<div class="links">${links}</div>` : ""}
        </div>
      `;
    }).join("");
  }

  search.addEventListener("input", render);
  filter.addEventListener("change", render);
  render();
}

document.getElementById("year").textContent = new Date().getFullYear();
loadPublications();
