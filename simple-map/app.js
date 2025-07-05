var map = document.querySelector("#map")
var maps = document.querySelectorAll(".global-map path")

maps.forEach((map) => {
    map.addEventListener('mouseenter' , (e) => {
        const d = e.target.getAttribute('d');
        const id = e.target.getAttribute('id');
        const title = e.target.getAttribute("title");
        
        document.querySelector("#map-preview").innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="380 335 288 244">
                <path d="${d}"/>
            </svg> 
        `;
        document.querySelector(".map-description").innerHTML = `
            <h1>${title}(${id})</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa tempore omnis officia excepturi magnam exercitationem delectus molestias. Et aliquam ab, similique accusantium aperiam deserunt nobis eum nemo, accusamus, mollitia enim?</p>
            <div>
                <button type="button">Explore more</button>
            </div>
        `;
    })
})