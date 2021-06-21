function Validation() {
    this.isEmpty = function (value,selectorError,name) {
        if(value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống !';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.allLetter = function(value,selectorError,name) {
        var regexAllLetter = /^[A-Z a-z]+$/; 
        if(regexAllLetter.test(value)){
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký tự!';
        return false;
    }
    this.checkValue = function (value, selectError, minValue, maxValue, name){
        if (value < minValue || value > maxValue){
            document.querySelector(selectError).innerHTML = `${name} chỉ có giá trị từ ${minValue} đến ${maxValue}`;
            return false;
        }
        document.querySelector(selectError).innerHTML = ` `;
        return true;
    }
    this.checkLength = function (value, selecError, minLength, maxLength, name){
        if (value.length < minLength || value.length > maxLength){
            document.querySelector(selecError).innerHTML = `${name} từ ${minLength} tới ${maxLength}`
            return false;
        }
        document.querySelector(selecError).innerHTML = ""
        return true;
    }
}