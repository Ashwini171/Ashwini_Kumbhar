





var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL='/api/irl';
var jpdbIML='/api/iml';
var empDBName="EMP_DB";
var empRelationName="EmpData";
var connToken="";

$("#empid").focus();

function saveRecNo2LS(jsonObj){
    var lvData=JSON.prase(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
   }
   
   function getEmpIdAsJsonObj(){
       var empid=$('#empid').val();
       var jsonStr={
           id:empid
       };
       return JSON.stringify(jsonStr);
   }
   
   function filldata(jsonObj){
       saveRecNo2LS(jsonObj);
       var data=JSON.parse(jsonObj.data).record;
       $('#empname').val(data.name);
         $('#empsal').val(data.salary);
           $('#hra').val(data.hra);
            $('#da').val(data.da);
             $('#deduct').val(data.deduct);
         }
       
    function resetForm(){
           $('#empid').val("");
           $('#empname').val("");
           $('#emsal').val("");
           $('#hra').val("");
           $('#da').val("");
           $('#deduct').val("");
           $('#empid').prop("disable", false);
           $('#save').prop("disable", true);
           $('#change').prop("disable", true);
           $('#reset').prop("disable", true);
           $('#empid').focus();
        }
        
        function validateData(){
            var empid, empsal, hra, da, deduct;
        empid=$('#empid').val();
        empid=$('#empame').val();
        empid=$('#empsal').val();
        empid=$('#hra').val();
        empid=$('#da').val();
        empid=$('#deduct').val();
        
        if(empid === ' '){
            alert("Employee Id missing");
                    $('#empid').focus();
                    return "";
                }
        if(empname === ' '){
            alert("Employee Name missing");
                    $('#empname').focus();
                    return "";
                }
        if(empsal === ' '){
            alert("Employee salary missing");
                    $('#empsal').focus();
                    return "";
                }
        if(hra === ' '){
            alert("Employee hra missing");
                    $('#hra').focus();
                    return "";
                }
         if(da === ' '){
            alert("Employee da missing");
                    $('#da').focus();
                    return "";
                }
                if(deduct === ' '){
            alert("Employee deduct missing");
                    $('#deduct').focus();
                    return "";
                }
                
          var jsonStrObj ={
              id: empid,
              name: empname,
              salary: empsal,
              hra: hra, 
              da: da,
              deduction: deduct
          };
          return JSON.stringify(jsonStrObj);
      }
  
      function getEmp(){
         var empIdJsonObj =getEmpIdAsJsonObj();
         var getRequest = createGET_BY_KEYRequest(connToken,empDBName, empRelationName, empIdJsonObj);
         jQuery.ajaxSetup({async: false});
         var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
         jQuery.ajaxSetup({async: true});
         if(resJsonObj.status===400){
             $("#save").prop('disabled' , false);
             $("#reset").prop('disabled' , false);
             $("#empname").focus();
         }
         else if(resJsonObj.status===200){
             
             $("#empid").prop('disabled' , true);
             fillData(resJsonObj);
             
             $(#change).prop("diabled", false);
                 $(#reset).prop("diabled", false);
                     $(#empname).focus();
         
          }
      }   
       
function saveData(){
 var jsonStr = validateData();
    if (jsonStr === "") {
      return;
    }
    var putRequest = createPUTRequest(connToken, jsonChg,empDBName, empRelationName);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
      jQuery.ajaxSetup({ async: true });
        resetForm();
        $("#empid").focus();
  }

function changeData(){
$('#change').prop("disabled", true);
JsonChg=validateData();
var updateRequest=createUPDATERecordRequest(connToken. jsonchg, empDBName,empRelationName, localStorage.getItem("recno"));
  jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
      jQuery.ajaxSetup({ async: true });
        resetForm();
        $("#empid").focus();
}