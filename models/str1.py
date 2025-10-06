import streamlit as st
import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, classification_report

# ---------------------------
# App Title
# ---------------------------
st.title("Lead Priority Prediction System")
st.write("Upload your lead dataset or input new lead details to predict Lead Priority.")

# ---------------------------
# Upload CSV
# ---------------------------
uploaded_file = st.file_uploader("Upload CSV", type=["csv"])

if uploaded_file:
    df = pd.read_csv(uploaded_file)
    
    # ---------------------------
    # Clean column names
    # ---------------------------
    df.columns = (
        df.columns.str.strip()
        .str.lower()
        .str.replace(r'[^a-z0-9_]', '_', regex=True)
    )
    
    st.write("### Dataset Preview")
    st.dataframe(df.head())
    
    # ---------------------------
    # Compute numeric 'lead_score'
    # ---------------------------
    numeric_features = [
        'annual_revenue__m__',
        'leads_generated',
        'conversion_rate____',
        'total_purchases_last_year',
        'frequency_num'  # ensure this column exists
    ]
    
    df['lead_score'] = df[numeric_features].apply(
        lambda x: (x - x.min()) / (x.max() - x.min())
    ).sum(axis=1)
    
    # ---------------------------
    # Derive 'lead_priority' from 'lead_score'
    # ---------------------------
    df['lead_priority'] = pd.qcut(df['lead_score'], q=3, labels=['Low', 'Medium', 'High'])
    
    st.write("### Lead Priority Preview")
    st.dataframe(df[['lead_score', 'lead_priority']].head())
    
    # ---------------------------
    # Features and target
    # ---------------------------
    categorical_features = [
        'industry',
        'company_size',
        'campaign_type',
        'region',
        'district',
        'contract_status',
        'payment_behavior',
        'preferred_channel'
    ]
    
    X = df.drop(columns=['lead_score', 'lead_priority', 'company_id', 'sales_rep', 
                         'last_product_1', 'last_product_2'])
    y = df['lead_priority']
    
    # ---------------------------
    # Train/Test split
    # ---------------------------
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # ---------------------------
    # Preprocessing pipeline
    # ---------------------------
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numeric_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ]
    )
    
    clf = Pipeline([
        ('preprocess', preprocessor),
        ('model', RandomForestClassifier(random_state=42))
    ])
    
    # ---------------------------
    # Train model
    # ---------------------------
    clf.fit(X_train, y_train)
    
    # ---------------------------
    # Save pipeline
    # ---------------------------
    with open('lead_priority_pipeline.pkl', 'wb') as f:
        pickle.dump(clf, f)
    
    st.success("Model trained and pipeline saved successfully! ✅")
    
    # ---------------------------
    # Evaluate model
    # ---------------------------
    y_pred = clf.predict(X_test)
    
    st.write("### Model Evaluation")
    st.write(f"**Accuracy:** {clf.score(X_test, y_test):.2f}")
    
    st.write("**Confusion Matrix:**")
    st.dataframe(confusion_matrix(y_test, y_pred))
    
    st.write("**Classification Report:**")
    class_report_df = pd.DataFrame(classification_report(y_test, y_pred, output_dict=True)).transpose()
    st.dataframe(class_report_df)
    
    # ---------------------------
    # Predict on new input
    # ---------------------------
    st.write("### Predict Lead Priority for New Lead")
    
    with st.form(key='new_lead_form'):
        new_data = {}
        for col in numeric_features + categorical_features:
            new_data[col] = st.text_input(f"Enter {col}", value="")
        
        submit_button = st.form_submit_button(label='Predict')
    
    if submit_button:
        # Convert numeric features to float
        for col in numeric_features:
            new_data[col] = float(new_data[col])
        
        new_df = pd.DataFrame([new_data])
        # Load pipeline
        with open('lead_priority_pipeline.pkl', 'rb') as f:
            loaded_pipeline = pickle.load(f)
        
        pred = loaded_pipeline.predict(new_df)
        st.write(f"Predicted Lead Priority: **{pred[0]}**")
