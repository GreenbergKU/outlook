class RenderDOM {
    constructor() {
  };

  displaySection(sectionID) {
    const sections = document.getElementsByTagName("section");
    Array.from(sections).map((sec) => 
      sec.id === sectionID ? sec.classList.remove("hidden") : sec.classList.add("hidden")
    );
    document.getElementById("body").style.background = "silver";
    return this
  };

  customizeSection(user) {
    console.log('user: ', user);
    
  }
};

export default RenderDOM