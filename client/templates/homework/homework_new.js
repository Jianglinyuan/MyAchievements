Template.newhomework.helpers({
    count: function(){
        var count = Homeworks.find().count();
        return count+1;
    }
});
Template.newhomework.events({
    'submit form':function(e){
        e.preventDefault();
        var title = $(e.target).find('[id=title]').val();
        var url = $(e.target).find('[id=url]').val();
        var starttime = $(e.target).find('[id=starttime]').val();
        var deadline = $(e.target).find('[id=deadline]').val();
        var year = new Date().getFullYear();
        var month = new Date().getMonth()+1;
        var day = new Date().getDate();
        var hour = new Date().getHours();
        var min = new Date().getMinutes();
        if (month < 10){
            month = '0' + month;
        }
        if (day < 10){
            day = '0' + day;
        }
        var date = year + '-' + month + '-' + day + 'T' + hour + ':' + min;
        var state;
        if (date >= starttime && date <= deadline){
            state = "present";
        }else if(date < starttime){
            state = "future";
        }else if(date > deadline){
            state = "previous"
        }
        var count = Homeworks.find().count();
        Homeworks.insert({
            url: url,
            title: title,
            state: state,
            count: count+1
        });
        Router.go('index');
    },
});
