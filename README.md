# JSON
## MICROPROJECT

### Student Enrollment Form

<!DOCTYPE html>

<html lang="en">
    <head>
        <title>Micro_Project_Work</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
            />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <script src="https://login2explore.com/jpdb/resources/js/0.0.3/jpdb-commons.js"></script>
        
    </head>
    <body>
        <div class="container">
            <h2>Student Enrollment Form (Micro Project Work)</h2>
            <form id="s_Form" method="post">
                <div class="form-group">
                    <span
                        ><label for="stuId">Roll-No:</label> <label id="stuIdMsg"> </label
                        ></span>

                    <input
                        type="text"
                        class="form-control"
                        onchange="getStudent()"
                        name="stuId"
                        id="stuId"
                        placeholder="Enter Roll-No"
                        required
                        />
                </div>

                <div class="form-group">
                    <label for="stuName">Student Full Name:</label>
                    <input
                        type="text"
                        class="form-control"
                        id="stuName"
                        placeholder="Enter Full Name"
                        name="stuName"
                        />
                </div>

                <div class="form-group">
                    <label for="stuClass">Class:</label>
                    <input
                        type="text"
                        class="form-control"
                        id="stuClass"
                        placeholder="Enter Class"
                        name="stuClass"
                        />
                </div>

                <div class="form-group">
                    <label for="stuDOB">Birth-Date:</label>
                    <input
                        type="date"
                        class="form-control"
                        id="stuDOB"
                        placeholder="Enter Birth-Date"
                        name="stuDOB"
                        />
                </div>

                <div class="form-group">
                    <label for="stuAddress">Address:</label>
                    <input
                        type="text"
                        class="form-control"
                        id="stuAddress"
                        placeholder="Enter Address"
                        name="stuAddress"
                        />
                </div>

                <div class="form-group">
                    <label for="stuEnrollDate">Enrollment-Date:</label>
                    <input
                        type="date"
                        class="form-control"
                        id="stuEnrollDate"
                        placeholder="Enter Enrollment-Date"
                        name="stuEnrollDate"
                        />
                </div>

                <input
                    type="button"
                    class="btn btn-primary"
                    id="empSave"
                    value="Save"
                    onclick="saveData();"
                    />
                <input
                    type="button"
                    class="btn btn-primary"
                    id="empChange"
                    value="Change"
                    onclick="changeData();"
                    />
                <input
                    type="button"
                    class="btn btn-primary"
                    id="empReset"
                    value="Reset"
                    onClick="resetForm()"
                    />
                
            </form>
        </div>

        <script>
            function validateAndGetFormData() {
                var stuIdVar = $("#stuId").val();
                if (stuIdVar === "") {
                    alert("Student Roll-No Required Value");
                    $("#stuId").focus();
                    return "";
                }
                var stuNameVar = $("#stuName").val();
                if (stuNameVar === "") {
                    alert("Student Name is Required Value");
                    $("#stuName").focus();
                    return "";
                }
                var stuClassVar = $("#stuClass").val();
                if (stuClassVar === "") {
                    alert("Student Class is Required Value");
                    $("#stuClass").focus();
                    return "";
                }

                var stuDOBVar = $("#stuDOB").val();
                if (stuDOBVar === "") {
                    alert("Student Birth-Date is Required Value");
                    $("stuDOB").focus();
                    return "";
                }

                var stuAddressVar = $("#stuAddress").val();
                if (stuAddressVar === "") {
                    alert("Student Address is Required Value");
                    $("#stuAddress").focus();
                    return "";
                }

                var stuEnrollDateVar = $("stuEnrollDate").val();
                if (stuEnrollDateVar === "") {
                    alert("Student Enrollment-Date is Required Value");
                    $("stuEnrollDate").focus();
                    return "";
                }

                var jsonStrObj = {
                    stuId: stuIdVar,
                    stuName: stuNameVar,
                    stuClass: stuClassVar,
                    stuDOB: stuDOBVar,
                    stuAddress: stuAddressVar,
                    stuEnrollDate: stuEnrollDateVar,
                };
                return JSON.stringify(jsonStrObj);
            }

            function getstuIdASJsonObj() {
                var stuid = $("#stuid").val();
                var jsonStr = {
                    id: stuid
                };
                return JSON.stringify(jsonStr);
            }

            function getStudent() {
                var stuIdJsonObj = getstuIdASJsonObj();
                var getRequest = createGET_BY_KEYRequest(
                        connToken,
                        stuDBName,
                        stuRelationName,
                        stuIdJsonObj
                        );
                jQuery.ajaxSetup({async: false});
                var resJsonObj = executeCommandAtGivenBaseUrl(
                        getRequest,
                        jpdbBaseURL,
                        jpdbURL
                        );
                jQuery.ajaxSetup({async: true});
                if (resJsonObj.status === 400) {
                    $("#save").prop("disabled", flase);
                    $("#reset").prop("disabled", false);
                    $("#stuname").focus();
                } else if (resJsonObj.status === 200) {
                    $("#stuid").prop("disabled", true);
                    fillData(resJsonObj);
                    $("#change").prop("disabled", false);
                    $("#reset").prop("disabled", false);
                    $("#stuname").focus();
                }
            }

            function resetForm() {
                $("#stuId").val("");
                $("#stuName").val("");
                $("#stuClass").val("");
                $("#stuDOB").val("");
                $("#stuAddress").val("");
                $("#stuEnrollDate").val("");
                $("#stuId").focus();
            }

            function changeData() {
                $("#change").prop("disabled", true);
                jsonChg = validateData();
                var updateRequest = createUPDATERecordRequest(
                        ConnToken,
                        jsonChg,
                        stuDBName,
                        stuRelationName,
                        localStorage.getItem("recno")
                        );
                jQuery.ajaxSetup({async: falses});
                var resJsonObj = executeCommandAtGivenBaseUrl(
                        updateRequest.jpdBaseURL,
                        jpdbIML
                        );
                jQuery.ajaxSetup({async: true});
                console.log(resJsonObj);
                resetForm();
                $("#stuID").focus();
            }

            function saveData() {
             

                var jsonStr = validateAndGetFormData();
                if (jsonStr === "") {
                    return;
                }
                var putReqStr = createPUTRequest(
                        "90932921|-31949280827372371|90947659",
                        jsonStr,
                        "School_DB",
                        "Student"
                        );

                alert(putReqStr);

                jQuery.ajaxSetup({async: false});
                var resultObj = executeCommandAtGivenBaseUrl(
                        putReqStr,
                        "http://api.login2explore.com:5577",
                        "/api/iml"
                        );
                jQuery.ajaxSetup({async: true});

                alert(JSON.stringify(resultObj));
                resetForm();
            }
        </script>
    </body>
</html>
![Screenshot (57)](https://user-images.githubusercontent.com/91425601/229287481-63aaa934-cc30-4c62-8d50-57346bb99df0.png)
![Screenshot (58)](https://user-images.githubusercontent.com/91425601/229287484-cf35f6bc-a43e-461f-9bc9-fb3b55aac078.png)
![Screenshot (59)](https://user-images.githubusercontent.com/91425601/229287486-00861d93-e7cb-47a7-b7a7-bab727326029.png)
![Screenshot (60)](https://user-images.githubusercontent.com/91425601/229287488-3ebe84a3-3a3c-43be-bcc0-2c0b9a25ff5b.png)

### Employee form


       <!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html lang="en">
  <head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script src="https://login2explore.com/jpdb/resources/js/0.0.3/jpdb-commons.js"></script>
  </head>
  <body> <div class="container">
        <div class="page-header text-center">
            <h2>Employee Form</h2>
        </div>
        <form id="empform" method="get">
            <div class="form-group">
                <span
                    ><label>EmployeeID:</label> <label id="stuIdMsg"> </label
                    ></span>
          <input
        type="text"
        class="form-control"
        onchange="getEmp()"
        name="empId"
        id="empId"
        placeholder="Enter Employee ID"
        required
      />
    </div>
    
    <form>
    <div class="form-group">
      <label for="empName">Employee Name:</label>
      <input
        type="text"
        class="form-control"
        id="empName"
        placeholder="Enter Employee Name"
        name="empName"
      />
    </div>
    <div class="form-group">
      <label for="empsalary">Salary:</label>
      <input
        type="number"
        class="form-control"
        id="empsalary"
        placeholder="Enter Employee salary"
        name="empsalary"
      />
    </div>
         <div class="form-group">
      <label for="hra">HRA:</label>
      <input
        type="number"
        class="form-control"
        id="hra"
        placeholder="Enter Employee HRA"
        name="hra"
      />
    </div>
         <div class="form-group">
      <label for="da">DA:</label>
      <input
        type="number"
        class="form-control"
        id="da"
        placeholder="Enter Employee da"
        name="da"
      />
    </div>
         <div class="form-group">
      <label for="deduct">Deduction:</label>
      <input
        type="number"
        class="form-control"
        id="deduct"
        placeholder="Enter Employee deduction"
        name="deduct"
      />
    </div>
    <input
      type="button"
      class="btn btn-primary"
      id="empSave"
      value="Save"
      onclick="saveEmployee();"
    />
    <input
      type="button"
      class="btn btn-primary"
      id="empChange"
      value="Change"
      onclick="changeEmployee();"
    />
    <input
      type="button"
      class="btn btn-primary"
      id="empReset"
      value="Reset"
      onClick="window.location.reload()"
    />
  </form>
</div>

<script>
  function validateAndGetFormData() {
    var empIdVar = $("#empId").val();
    if (empIdVar === "") {
      alert("Employee ID Required Value");
      $("#empId").focus();
      return "";
    }
    var empNameVar = $("#empName").val();
    if (empNameVar === "") {
      alert("Employee Name is Required Value");
      $("#empName").focus();
      return "";
    }
    var empsalaryVar = $("#empsalary").val();
    if (empsalaryVar === "") {
      alert("Employee salary is Required Value");
      $("#empsalary").focus();
      return "";
    }
    var hraVar = $("#hra").val();
    if (hraVar === "") {
      alert("Employee hra is Required Value");
      $("#hra").focus();
      return "";
    }
    var daVar = $("#da").val();
    if (daVar === "") {
      alert("Employee da is Required Value");
      $("#da").focus();
      return "";
    }
    var deductVar = $("#deduct").val();
    if (deductVar === "") {
      alert("Employee deduction is Required Value");
      $("#deduct").focus();
      return "";
    }
    var jsonStrObj = {
      empId: empIdVar,
      empName: empNameVar,
      empsalary: empsalaryVar,
      hra: hraVar,
      da: daVar,
      deduct: deductVar
    };
    return JSON.stringify(jsonStrObj);
  }

  function resetForm() {
    $("#empId").val("");
    $("#empName").val("");
    $("#empsalary").val("");
    $("#hra").val("");
    $("#da").val("");
    $("#deduct").val("");
    $("#empId").focus();
  }

  function saveEmployee() {
   

    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
      return;
    }
    var putReqStr = createPUTRequest(
      "90932921|-31949280513860575|90947607",
      jsonStr,
      "EMP",
      "EMP-REL"
    );

    alert(putReqStr);

    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(
      putReqStr,
      "http://api.login2explore.com:5577",
      "/api/iml"
    );
    jQuery.ajaxSetup({ async: true });

    alert(JSON.stringify(resultObj));
    resetForm();
  }
</script>
    </body>
</html>
    
![Screenshot (65)](https://user-images.githubusercontent.com/91425601/229291420-66aa492f-47b7-4227-afac-f553e64ea932.png)
![Screenshot (66)](https://user-images.githubusercontent.com/91425601/229291422-dd5f5b73-4506-4ea7-90ac-44db7d3250cb.png)
![Screenshot (67)](https://user-images.githubusercontent.com/91425601/229291424-fa89015d-606f-4f75-986f-e459c3d62140.png)
![Screenshot (68)](https://user-images.githubusercontent.com/91425601/229291475-7e97882e-75bb-4982-962d-04dabd41bf86.png)
    
  
    
### Vertical (basic) form
![Screenshot (70)](https://user-images.githubusercontent.com/91425601/229291568-2d90e272-6ff7-4678-b1d3-3654bfe60160.png)
![Screenshot (71) - Copy](https://user-images.githubusercontent.com/91425601/229291571-3810c0ab-4a6d-4927-898a-7dd7fb756f56.png)
![Screenshot (71)](https://user-images.githubusercontent.com/91425601/229291573-b1d6982b-123d-4e96-a55e-7fab7a7e5c44.png)
    
  
