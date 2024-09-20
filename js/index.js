"use strict";
window.addEventListener("load", () => {
    document.getElementById("google").addEventListener("keypress", (e) => {
        console.log(e);
        if (e.key == "Enter") {
            let url = new URL("https://google.com/search");
            url.searchParams.set("q", e.target.value);
            if (e.ctrlKey)
                window.open(url, "_blank");
            else
                location.href = url.toString();
        }
    });
});
