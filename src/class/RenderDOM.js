class RenderDOM {
  constructor() {
    this.displaySection;
  }
  displaySection(sectionID) {
    const sections = document.getElementsByTagName("section");
    console.log('sections: ', sections);
    console.log('this before map: ', this);
    Array.from(sections).map((sec) => {
      
      sec.id === sectionID ? (
        sec.classList.remove("hidden"),
        this.displaySection = this.displaySection.bind(sec),
        console.log('this after bind: ', this) 
      )
      : sec.classList.add("hidden");
    });
    console.log('this after map: ', this)
    document.getElementById("body").style.background = "silver";

    /*
      0: section#login-page
      1: section#manager-page.hidden 
      2: section#guest-page.hidden
    */
  } 
}

export default RenderDOM