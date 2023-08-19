const rInt = (a) => Math.ceil(Math.random() * a)
    const rClr = () => `rgba(${rInt(255)},${rInt(255)},${rInt(255)},1)`
    let flash = false;
    let boosted = false;
    var color = rClr()
    var defaultColor = "#1D1F20"
    var firstTimeline = anime.timeline({
        autoplay: false
    });
    var secondTimeLine = anime.timeline({
        autoplay: false
    });
    const duration = 2*1000
    const timeTravel = anime.timeline({
        autoplay: false,
        complete: () => {
            for (let i = 0; i < links.length; i += 1) {
                links.item(i).href = cachedLinks[i]
                links.item(i).style.cursor = "pointer"
                // cachedLinks[i] = links.item(i).href
            }
        }
    })
        .add({
            delay: 3000,
            targets: "#c08",
            scaleX: -1,
            duration,
        })
        .add({
            targets: "#c0208",
            scaleX: -1,
            duration,
        })
        .add({
            targets: "#c2",
            scaleX: -1,
            duration,
        })
        .add({
            targets: ["#c2023", "#c2024"],
            translateX: 60,
            color: (e) => {
                if (e.id === "c2023") {
                    return "rgba(169,169,169,1)";
                }
                return "rgba(169,169,169,0)"
            },
            duration,
        })
        .add({
            targets: ["#content-area"],
            opacity: 1,
            height: "360px",
            duration: duration*2,
        })

    firstTimeline
        .add({
            targets: [".button-text"],
            duration: 10000,
            opacity: 1,
            color: "white"
        })
    secondTimeLine
        .add({
            targets: [".button"],
            duration: 10000,
            borderColor: "rgba(255,255,255,0.5)"
        })
    setTimeout(() => {
        firstTimeline.play()
        secondTimeLine.play()
    }, 2000)
    setInterval(() => {
        color = rClr()
        anime({
            targets: "body",
            backgroundColor: () => {
                return flash && !boosted ? color : defaultColor
            },
            duration: 1,
            easing: "linear"
        });
    }, 50)

    document.getElementById("the-button").addEventListener("mouseenter", () => {
        flash = true
    })
    document.getElementById("the-button").addEventListener("mouseleave", () => {
        flash = false
    })

    const links = document.getElementsByTagName("a")
    const cachedLinks = {}
    for (let i = 0; i < links.length; i += 1) {
        cachedLinks[i] = links.item(i).href
        links.item(i).href = ""
        links.item(i).style.cursor = "auto"
    }
    document.getElementById("the-button").addEventListener("click", () => {
        document.getElementById('before-click-content').className = "hide";
        document.getElementById('ads-bg-content').className = "show";
        document.getElementById('ads-content').className = "show";

        //ads timer
        const start = 10
        let flipped = false
        let now = 0
        let adsTimer = setInterval(function () {
            const distance = start - now;
            let displayDist, preText
            now += 1
            if(distance >= 6) {
                preText = "please wait "
                displayDist = distance - 6
            } else if(distance >= 3){
                preText = "please wait "
                displayDist = distance - 6
            } else {
                preText = "อุ้ยเลย รอใหม่ "
                displayDist = -distance
            }

            document.getElementById("countdown-ads").innerHTML = preText + displayDist.toString() + " seconds"
            
            // If the count down is finished, show skip
            if (flipped = true && distance < 0) {
                document.getElementById("skip-button").className = "default-button-text button-text show";
                document.getElementById("countdown-ads").className = "hide";

                clearInterval(adsTimer);
                now = 1
                let loadingTimer = setInterval(function () {
                    const distance = start - now;
                    now += 1
                    // If the loading is finished, show present
                    if (distance < 0) {
                        boosted = true
                        timeTravel.play()
                        document.getElementById('ads-bg-content').className = "hide";
                        document.getElementById('ads-content').className = "hide";
                        document.getElementById('after-click-content').className = "show";
                        clearInterval(loadingTimer);
                    }
                }, 1000);

            }
        }, 1000);
    })

    document.getElementById("skip-button").addEventListener("click", () => {
        document.getElementById("countdown-loading").className = "faint-title show";
        document.getElementById("skip-button").className = "hide";
    })