/**
 * Created by Kira on 9/22/15.
 */

Template.assistantReviewList.helpers({
    count: function(){
        var homeworkId = this._id;
        return Homeworks.findOne(homeworkId).count;
    },
    'groups': function() {
        var groups = new Array();
        for (var i = 1; ; i++) {
            var groupStudents = Meteor.users.find({
                'profile.group': i
            }).fetch();
            if (groupStudents.length == 0 || !groupStudents) break;
            for (var j = 0; j < groupStudents.length; j++) {
                var homework = Homeworkfiles.findOne({
                    'metadata.userId': groupStudents[j]._id
                });
                console.log(homework);
                if (homework) {
                    groupStudents[j].homeworkId = homework._id;
                    groupStudents[j].url = homework.url;
                } else {
                    groupStudents[j].homeworkId = "none";
                }
            }
            var groupStudents = {
                number: i,
                groupStudents: groupStudents
            };
            groups.push(groupStudents);
            console.log(groups);
        }
        return groups;
    }
});

Template.assistantReviewList.events({
    'click .downloadfile': function(event, template) {
        event.preventDefault();
        var url=$(event.currentTarget).attr("href");
        window.open(url);
    },
    'click .review_detail_btn': function(e) {
        e.preventDefault();

        Router.go('/assistant/review/' + this._id + "/" + this.homeworkId);
    }
});
