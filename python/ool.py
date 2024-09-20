import streamlit as st
name=st.text_input("enter the text:")
if st.button("reverse"):
    st.write(name[::-1])
if st.button("print first 4 letters"):
    st.write(name[0:5])