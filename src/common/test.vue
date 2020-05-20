<template>
  
</template>

<script>
export default {
abs(x) {
    if (x !== Number) {
      throw 'not a number'
    }
    if (x >= 0) {
      return x
    } else {
      return -x
    }
  },

// bar()传入的参数为null 时代码报错，错误会向上抛foo(),foo()没有try...catch语句,所以错误会向上抛给main()，因为main()函数中有try...catch语句
//所以错误会最终在main()中被处理。
main(s) {
  console.log('BEGIN main()');
  try {
    foo(s);
  } catch (error) {
    console.log('出错了' + error);
  }
  console.log('END main()');      
},

foo(s){
  console.log('BEGIN foo()');
  bar(s);
  console.log('END foo()');    
},

bar(s){
  console.log('BEGIN bar()');
  console.log('length = ' + s.length);  
  console.log('END bar()');    
}
}
</script>