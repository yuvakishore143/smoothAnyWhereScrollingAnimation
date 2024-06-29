const track = document.querySelector('#image-track')


window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") { return }

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    maxDelta = window.innerWidth / 2;



    const percentage = (mouseDelta / maxDelta) * -100;
    nextPercentageUnConstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnConstrained, 0), -100);
    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}% , -50%)`
    }, { duration: 1200, fill: 'forwards' })

    for (const image of track.getElementsByTagName("img")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}%  -50%`
        }, { duration: 1200, fill: 'forwards' })
    }

}

window.onmouseup = e => {
    track.dataset.mouseDownAt = '0';
    track.dataset.prevPercentage = track.dataset.percentage;
}