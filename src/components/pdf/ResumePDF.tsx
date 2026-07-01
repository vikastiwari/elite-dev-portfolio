import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

// STRICT YOGA COMPATIBLE STYLING
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  title: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  projectBlock: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  projectDesc: {
    fontSize: 10,
    color: '#334155',
    marginTop: 4,
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  }
});

export default function ResumePDF() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.header}>
          <Text style={styles.name}>{PORTFOLIO_CONFIG.resumeData.name}</Text>
          <Text style={styles.title}>{PORTFOLIO_CONFIG.resumeData.title}</Text>
          <Text style={styles.title}>Email: {PORTFOLIO_CONFIG.resumeData.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.projectDesc}>{PORTFOLIO_CONFIG.resumeData.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience & Projects</Text>
          {PORTFOLIO_CONFIG.projectMatrix.map((project, idx) => (
            <View key={idx} style={styles.projectBlock}>
              <Text style={styles.projectName}>{project.title}</Text>
              <Text style={styles.projectDesc}>{project.architectureSummary}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          Generated dynamically via @react-pdf/renderer | Edge-Free WASM Architecture
        </Text>
      </Page>
    </Document>
  );
}
