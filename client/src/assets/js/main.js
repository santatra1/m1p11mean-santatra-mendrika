
document.addEventListener('DOMContentLoaded',function(){
    document.querySelector('.sidebar-toggler').addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('open');
        document.querySelector('.content').classList.toggle('open');
        return false;
    });
    
})