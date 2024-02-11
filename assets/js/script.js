

// form repeater

//jQuery Document Ready Function: $(document).ready(function(){...}) is a jQuery method that ensures the code inside it only runs after the DOM (Document Object Model) is fully loaded. This is important because it prevents attempts to manipulate elements that aren't yet available in the document.

$(document).ready(function(){
    $('.repeater').repeater({
        initEmpty: false, 
        //initEmpty is an option that determines whether the repeater should start without any item oo not and in this case it is not
        //initEmpty: false, which means the repeater will not start empty but instead display at least one set of input fields for the user to fill out.
        defaultValues: {
            'text-input': ''
        },
        show:function(){
            $(this).slideDown();
        },
        hide: function(deleteElement){
            $(this).slideUp(deleteElement);
            setTimeout(() => {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    })
})


