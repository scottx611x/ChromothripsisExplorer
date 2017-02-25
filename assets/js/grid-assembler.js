var availablePdfs = [];


$( document ).ready(function(){
  $.ajax({
    url: 'pdfs/',
    success: function (data) {
      //Gather all pdf filenames
      $(data).find("a:contains(" + ".pdf" + ")").each(function () {
        var filename = this.innerHTML;
        availablePdfs.push(filename);
      });
    }
  });
  $( "#pdfs" ).autocomplete({
    delay: 500,
    source: availablePdfs,
    appendTo: "#search-results",
    response: function( event, ui ) {
      $("#search-results").empty();
      $("#data-grid").empty();
      $(".ui-helper-hidden-accessible").hide();

      var gridData = ["<div class='grid-sizer'></div>"];
      for( var index in ui.content) {
        var filename = ui.content[index].value;
        gridData.push(
        "<div class=data-item>" +
          "<div class='grid-item'>" +
            "<object data=pdfs/" + filename + " type='application/pdf'>" +
            "  <a class='link' href=pdfs/" + filename + ">" + filename +"</a>" +
            "</object>" + 
          "</div>" +
        "</div>");   
      }
      $("#data-grid").html(gridData);
      $('.grid').masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: '.grid-sizer'
      });
    }
  });
});
