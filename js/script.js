(function(global) {

    var dc = {};
    var homeHtml = "snippets/home.html";
    var categoryHtml = "snippets/category.html";
    var categoryJson = "json/categories.json";
    var devicesHtml = "snippets/devices.html";
    var pro_infos_json = "json/products-infos.json";
    var deviceHtml = "snippets/device.html";

    var insertHtml = function(selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
    var showLoading = function(selector) {
        var html = "";

        insertHtml(selector, html);
    };


    var insertProperty = function(string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string
            .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function(event) {
        // On first load, show home view
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function(responseText) {
                document.querySelector("#main-content")
                    .innerHTML = responseText;
            },
            false);
    });

    /* Json Dosyasından veri okuma */
    dc.loadCategories = function() {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            categoryJson,
            buildCategoriesHTML, true);
    };


    function buildCategoriesHTML(categories) {
        $ajaxUtils.sendGetRequest(
            categoryHtml,
            function(responseText) {
                var finalHtml = "";
                finalHtml += "<section class='row'>";

                // Loop over categories
                for (var i = 0; i < categories.length; i++) {
                    // Insert category values
                    var html = responseText;

                    var name = "" + categories[i].name;

                    html =
                        insertProperty(html, "name", name);

                    finalHtml += html;
                }

                finalHtml += "</section>";
                insertHtml("#main-content", finalHtml);
            }, false
        )

    }

    dc.loadDevices = function() {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            pro_infos_json,
            buildDevicesHtml, true);
    };

    function buildDevicesHtml(categories) {
        $ajaxUtils.sendGetRequest(
            devicesHtml,
            function(responseText) {
                var finalHtml = "";
                finalHtml += "<section class='row'>";


                // Loop over categories
                for (var i = 0; i < categories.length; i++) {
                    // Insert category values
                    var html = responseText;

                    var name = "" + categories[i].name;
                    var id = categories[i].id;
                    html =
                        insertProperty(html, "name", name);
                    html = insertProperty(html, "id", id);

                    finalHtml += html;
                }

                finalHtml += "</section>";
                insertHtml("#main-content", finalHtml);
            }, false
        )

    }

    dc.loadDevice = function(id) {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            pro_infos_json,
            (category) => buildDeviceHTML(category, id), true
        );
    };

    function buildDeviceHTML(categories, id) {

        $ajaxUtils.sendGetRequest(
            deviceHtml,
            function(responseText) {
                var finalHtml = "";
                finalHtml += "<section class='row'>";
                var html = responseText;
                var name = "" + categories[id - 1].name;
                var model = "" + categories[id - 1].model;
                var brand = "" + categories[id - 1].brand;
                var production_date = "" + categories[id - 1].production_date;
                var production_side = "" + categories[id - 1].production_side;
                var price = "" + categories[id - 1].price;
                var explanation = "" + categories[id - 1].explanation;
                html = insertProperty(html, "name", name);
                html = insertProperty(html, "model", model);
                html = insertProperty(html, "brand", brand);
                html = insertProperty(html, "production date", production_date);
                html = insertProperty(html, "production side", production_side);
                html = insertProperty(html, "price", price);
                html = insertProperty(html, "explanation", explanation);
                finalHtml += html;
                finalHtml += "</section>";
                insertHtml("#main-content", finalHtml);

            }, false
        );
    };
    global.$dc = dc;

})(window);