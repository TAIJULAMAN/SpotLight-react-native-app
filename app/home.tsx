import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart2 } from 'lucide-react-native';
import { Colors, Spacing } from '../constants/Theme';
import { CHARACTERS } from '../constants/MockData';
import CharacterCard from '../components/CharacterCard';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { useVoteStatus, MAX_VOTES } from '../utils/voteStorage';

export const metadata = {
    title: 'Home',
    description: 'Explore personalities and choose your favorite on Dark Grevil',
    author: 'Khaled Alghanim',
};

export default function HomeScreen() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const router = useRouter();
    const { votedIds, remainingVotes, hasReachedLimit } = useVoteStatus();

    const handleVote = () => {
        if (selectedId) {
            router.push({
                pathname: '/vote',
                params: { id: selectedId }
            });
        }
    };

    const isSelectedVoted = selectedId ? votedIds.includes(selectedId) : false;
    const isVoteDisabled = !selectedId || isSelectedVoted || hasReachedLimit;

    return (
        <SafeAreaView style={styles.container}>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="author" content={metadata.author} />
            </Head>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Profile */}
                <View style={styles.header}>
                    <Image
                        source={require('../assets/avatar.png')}
                        style={styles.avatar}
                    />
                    <View style={styles.headerText}>
                        <Text style={styles.greeting}>Hello, Khaled 👋</Text>
                        <Text style={styles.subGreeting}>
                            {hasReachedLimit
                                ? `You've used all ${MAX_VOTES} votes`
                                : `${remainingVotes} of ${MAX_VOTES} votes remaining`}
                        </Text>
                    </View>
                </View>

                {/* Characters */}
                <View style={styles.gridContainer}>
                    {CHARACTERS.map((char) => (
                        <CharacterCard
                            key={char.id}
                            name={char.name}
                            image={char.image}
                            isSelected={selectedId === char.id}
                            isVoted={votedIds.includes(char.id)}
                            onPress={() => {
                                setSelectedId(char.id);
                                router.push({
                                    pathname: '/watch',
                                    params: { id: char.id }
                                });
                            }}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.voteButton, isVoteDisabled && styles.disabledVoteButton]}
                    onPress={handleVote}
                    disabled={isVoteDisabled}
                    activeOpacity={0.85}
                >
                    <Text style={[styles.voteButtonText, isVoteDisabled && styles.disabledVoteButtonText]}>
                        {isSelectedVoted
                            ? 'Already Voted'
                            : hasReachedLimit
                            ? 'All Votes Cast'
                            : 'Vote Now'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.resultsLink}
                    onPress={() => router.push('/results')}
                    activeOpacity={0.7}
                >
                    <BarChart2 color={Colors.primary} size={20} />
                    <Text style={styles.resultsLinkText}>View Live Results</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollContent: {
        paddingBottom: 150,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.lg,
        marginTop: Spacing.md,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    headerText: {
        marginLeft: Spacing.md,
    },
    greeting: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subGreeting: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: Spacing.md,
        justifyContent: 'space-between',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: Spacing.lg,
        paddingBottom: 40,
        backgroundColor: '#000000',
        alignItems: 'center',
    },
    voteButton: {
        width: '100%',
        height: 60,
        backgroundColor: Colors.primary,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    disabledVoteButton: {
        backgroundColor: '#374151',
        shadowOpacity: 0,
        elevation: 0,
    },
    voteButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    disabledVoteButtonText: {
        color: '#9CA3AF',
    },
    resultsLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.lg,
    },
    resultsLinkText: {
        color: Colors.primary,
        marginLeft: Spacing.sm,
        fontSize: 16,
        fontWeight: '500',
    }
});
