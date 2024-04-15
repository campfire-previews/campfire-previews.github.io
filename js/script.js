/*code for the toc and case study*/
const caseStudy = document.getElementById("case-study");
const toc = document.getElementById("toc");
const tocLinks = document.querySelectorAll("#toc a");
const tocLinksCount = tocLinks.length;

function isTOCVisible() {
  const caseStudyTopIsVisible = window.scrollY >= caseStudy.offsetTop;
  console.log(caseStudyTopIsVisible);
  const caseStudyBottomIsVisible =
    window.scrollY + window.innerHeight >
    caseStudy.offsetHeight + caseStudy.offsetTop;

  return caseStudyTopIsVisible && !caseStudyBottomIsVisible;
}

function handleTOCVisibility() {
  console.log("handleTOC");
  if (isTOCVisible()) {
    toc.classList.add("show");
  } else {
    toc.classList.remove("show");
  }
}

function handleTOCSelection() {
  const clearSelectedToc = () => {
    const selectedTocItems = document.querySelectorAll("#toc .selected");
    const subItems = document.querySelectorAll(`li.subitem.show`);

    //hide any open subitems
    subItems.forEach((subItem) => {
      subItem.classList.remove("show");
    });

    //remove the selected items
    selectedTocItems.forEach((selectedTocItem) => {
      selectedTocItem.classList.remove("selected");
    });
  };

  const selectTocItem = (link) => {
    const tocItem = link.closest("li");
    const dataSection = tocItem.dataset.section;
    const subItems = document.querySelectorAll(
      `li.subitem[data-section="${dataSection}"]`,
    );

    subItems.forEach((subItem) => {
      subItem.classList.add("show");
    });

    tocItem.classList.add("selected");
  };

  //do nothing if we don't want to show the toc
  if (!toc.classList.contains("show")) return;

  //for each link in the toc
  for (let i = tocLinksCount - 1; i >= 0; i--) {
    const link = tocLinks[i];
    //link.hash is the place the anchor links to.
    if (!link.hash) continue;
    const target = document.querySelector(link.hash);

    //if the target exists and its reasonable far away
    if (!!target && target.offsetTop <= window.scrollY + 16 * 2) {
      clearSelectedToc();
      selectTocItem(link, target);

      break;
    }
  }
}

// Helpers
function throttle(callback, wait) {
  let prevent = false;

  return function (event) {
    if (!prevent) {
      callback(event);
      prevent = true;
      setTimeout(function () {
        prevent = false;
      }, wait);
    }
  };
}

function handlePageLoad() {
  handleTOCVisibility();
  handleTOCSelection();
}

function handleScroll() {
  handleTOCVisibility();
  handleTOCSelection();
}

//events
document.addEventListener("DOMContentLoaded", handlePageLoad);
document.addEventListener("scroll", throttle(handleScroll, 16));

console.log("JS 8");
