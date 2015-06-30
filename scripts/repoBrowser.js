var RepoBrowser = (function() {
    var lstRepos = $('#repoSection'),
        lstCommits = $('#commitSection');

    return {
        getRepos: function() {
            var orgName = $('#txtOrgName').val().trim(),
                orgNameInfo = $('#orgNameInfo'),
                getReposeUrl = null;

            orgNameInfo.html(orgName);
            
            if (orgName && orgName.length > 0) {
                // get ajax response

                getReposeUrl = 'https://api.github.com/orgs/' + orgName + '/repos?sort=updated';

                $.ajax({
                    method: 'GET',
                    url: getReposeUrl,

                    beforeSend: function() {
                        // show loader
                        lstRepos.find('.loader').removeClass('hide');
                        
                        lstRepos.find('.no-result').addClass('hide');
                        lstRepos.find('ol').addClass('hide');
                    },

                    complete: function() {
                        // hide loader
                        $('#loaderRepo').addClass('hide');
                    },

                    success: function(data) {
                        // display the results
                        lstRepos.find('.no-result').addClass('hide');
                        var docFragment = document.createDocumentFragment(),
                            listItem = null;

                        if (data.length > 0) {
                            data.forEach(function(item, index, arr) {
                                $('#orgAvatar').attr('src', item.owner.avatar_url);

                                listItem = $('<li/>');
                                listItem
                                    .addClass('repo-item')
                                    .attr('data-author', item.owner.login)
                                    .attr('data-repo-name', item.name)
                                    .html(item.full_name);
                                $(docFragment).append(listItem);
                            });
                            // clearing the list before showing the repos for the currently input organization
                            lstRepos.find('li').remove();
                            lstRepos.find('ol').append(docFragment).removeClass('hide');
                            lstRepos.on('click', '.repo-item', RepoBrowser.getRepoCommits);
                        } else {
                            // no matching results
                            console.log('No results found');

                        }
                        console.log(data, 'success');
                    },

                    error: function(error) {
                        // display error message
                        lstRepos.find('.no-result').removeClass('hide');
                    }
                });
            } else {
                // handle validation error 
            }
        },

        getRepoCommits: function(event) {
            var target = $(event.target),
                author = target.attr('data-author'),
                repoName = target.attr('data-repo-name'),
                getCommitsUrl = 'https://api.github.com/repos/' + author + '/' + repoName + '/commits';
            // /repos/shankarsridhar/RepoBrowser/commits

            lstRepos.find('.active').removeClass('active');
            $(event.target).addClass('active');

            $.ajax({
                method: 'GET',
                url: getCommitsUrl,

                beforeSend: function() {
                    // display spinner
                    $('#loader').removeClass('hide');
                    lstCommits.find('ol').addClass('hide');
                },

                success: function(commits) {
                    $('#loader').addClass('hide');
                    lstCommits.find('.no-result').addClass('hide');

                    var docFragment = document.createDocumentFragment(),
                        listItem = null,
                        commitLink = null;

                    if (commits.length > 0) {
                        commits.forEach(function(item, index, arr) {
                            // item.stargazers_count
                            commitLink = $('<a/>');
                            commitLink
                                .attr('href', item.html_url)
                                .attr('target', '_blank')
                                .html(item.sha);

                            listItem = $('<li/>');
                            listItem
                                .addClass('commit-item')
                                .html(commitLink);

                            $(docFragment).append(listItem);
                        });
                        // clearing the list before showing the commits for the currently selected repo
                        lstCommits.find('li').remove();
                        lstCommits.find('ol').append(docFragment).removeClass('hide');
                    } else {
                        // no matching results
                        console.log('No results found');
                    }
                    console.log(commits, 'success');
                },

                error: function(error) {
                    console.log('Error');
                    lstCommits.find('.no-result').removeClass('hide');
                }
            });
        }
    };
})();

$(function() {
    $('#btnSearch').on('click', RepoBrowser.getRepos);
});