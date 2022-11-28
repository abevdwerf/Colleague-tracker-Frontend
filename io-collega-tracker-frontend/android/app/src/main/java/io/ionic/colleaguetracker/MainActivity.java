package io.ionic.colleaguetracker;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;


import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.BridgeActivity;


public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        this.registerPlugin(GoogleAuth.class);

        super.onCreate(savedInstanceState);
    }
}
