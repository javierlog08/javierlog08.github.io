// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = 'cv.pdf';

var pageFn = function(page, canvasID) {
  console.log('Page loaded');
  
  var scale = 1.5;
  var viewport = page.getViewport({scale: scale});

  // Prepare canvas using PDF page dimensions
  var canvas = document.getElementById(canvasID);
  var context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  // Render PDF page into canvas context
  var renderContext = {
    canvasContext: context,
    viewport: viewport
  };
  var renderTask = page.render(renderContext);
  renderTask.promise.then(function () {
    console.log('Page rendered');
  });
}

// Asynchronous download of PDF
var loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function(pdf) {
  console.log('PDF loaded');
  
  // Fetch the first page
  pdf.getPage(1).then(function(page) {
    pageFn(page,'the-canvas');
  });

  // Fetch the second page
  pdf.getPage(2).then(function(page) {
    pageFn(page,'the-canvas2');
  });
  
}, function (reason) {
  // PDF loading error
  console.error(reason);
});