axios.get('https://pocketbase-1404.fly.dev/api/collections/data/records')
    .then(function (response) {
        // handle success
        document.getElementById("activation-code")
            .innerText = response.data.items[0].value
    })
    .catch(function (error) {
        // handle error
        // console.log(error);
    })
    .finally(function () {
        // always executed
    });