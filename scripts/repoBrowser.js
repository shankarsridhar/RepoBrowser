$(function(){
    $('#btnSearch').on('click', function(){
        var orgName = $('#txtOrgName').val().trim();
        var apiUrl = null;

        if(orgName && orgName.length > 0){
            // get ajax response

            apiUrl = 'https://api.github.com/orgs/' + orgName + '/repos';

            $.ajax({
                method: 'GET',
                url: apiUrl,
                
                beforeSend: function(){
                    console.log('sending data');
                },

                complete: function(){
                    console.log('got data');
                },
                
                success: function(data){
                    console.log(data, 'success');
                },
                
                error: function(error){
                    console.log(error, 'error');
                }
            });
        } else {
            // handle validation error 
        }
    });
});