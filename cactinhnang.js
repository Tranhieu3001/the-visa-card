import android.app.Activity;
import android.content.Intent;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.NfcV;
import android.os.Bundle;
import android.widget.TextView;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class MainActivity extends Activity {
    private NfcAdapter nfcAdapter;
    private TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textView = findViewById(R.id.textView);
        nfcAdapter = NfcAdapter.getDefaultAdapter(this);

        if (nfcAdapter == null) {
            textView.setText("NFC is not available on this device.");
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        Intent intent = getIntent();
        if (NfcAdapter.ACTION_TECH_DISCOVERED.equals(intent.getAction())) {
            processIntent(intent);
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        if (NfcAdapter.ACTION_TECH_DISCOVERED.equals(intent.getAction())) {
            processIntent(intent);
        }
    }

    private void processIntent(Intent intent) {
        Tag tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
        NfcV nfcV = NfcV.get(tag);
        if (nfcV != null) {
            try {
                nfcV.connect();
                byte[] cmd = new byte[]{
                    (byte)0x00, // Flags
                    (byte)0x20, // Command: Read Single Block
                    (byte)0x00  // Block Number
                };
                byte[] response = nfcV.transceive(cmd);
                if (response != null) {
                    String accountInfo = new String(response, StandardCharsets.UTF_8);
                    saveToStorage(accountInfo);
                    textView.setText("Card Info: " + accountInfo);
                }
                nfcV.close();
            } catch (IOException e) {
                textView.setText("Error reading NFC tag.");
                e.printStackTrace();
            }
        }
    }

    private void saveToStorage(String data) {
        // Lưu dữ liệu vào bộ nhớ điện thoại (ví dụ SharedPreferences hoặc File)
        // Đây là ví dụ sử dụng SharedPreferences
        SharedPreferences sharedPreferences = getSharedPreferences("CardInfo", MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("account_info", data);
        editor.apply();
    }
}
