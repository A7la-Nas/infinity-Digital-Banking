define({ 

  //Type your controller code here 
   downloadSingleFile: function(){
     var index = kony.application.getCurrentForm().segDownloadAttachments.selectedIndex;
     if(index.length>0){ 
       var rowIndex = index[1];
       if(rowIndex !== null)
       {
         var downloadedAttachment = kony.application.getCurrentForm().segDownloadAttachments.data[rowIndex];
         var formName = kony.application.getCurrentForm().id; 
         var controller = _kony.mvc.GetController(formName, true);
         controller.downloadSingleFile(downloadedAttachment);
       }
     }
   }
 
  });