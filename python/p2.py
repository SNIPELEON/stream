import streamlit as st 
age=st.number_input("enter the age:")
height=st.number_input("enter the height:")
if st.button("age"):
    if(age>=18):
        st.write("age ok")
    else:
        st.write("age not ok")
if st.button("height"):
    if(height>=150):
        st.write("height ok")
    else:
        st.write("height not ok")